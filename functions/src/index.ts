/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const next = require("next");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
require("firebase-functions/logger/compat");

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const db = admin.firestore();

exports.nextApp = functions
	.region("asia-southeast1")
	.https.onRequest(async (req: any, res: any) => {
		try {
			await nextApp.prepare();
			handle(req, res);
		} catch (error) {
			console.error("Error during nextApp.prepare():", error);
			res.status(500).send("Internal Server Error");
		}
	});

exports.assignStudentRole = onCall(
	{ region: "asia-southeast1" },
	async (request: any) => {
		const { uid, displayName } = request.data;
		try {
			await db.collection("users").doc(uid).set({
				role: "student",
				fullName: displayName,
				// Add other user details if needed
			});

			console.log(`Assigned 'student' role to new user: ${uid}`);
		} catch (error) {
			console.error("Error assigning role:", error);
		}
	}
);

exports.createClassroom = onCall(
	{ region: "asia-southeast1" },
	async (request: any) => {
		const { auth, data } = request;

		if (!auth || !auth.token) {
			throw new functions.https.HttpsError(
				"unauthenticated",
				"The user is not authenticated."
			);
		}

		const uid = auth.uid;

		try {
			const classroomId = admin
				.firestore()
				.collection("classrooms")
				.doc().id;

			await db.runTransaction(async (transaction: any) => {
				// Check the role of the person creating the classroom
				const userDocRef = db.collection("users").doc(uid);
				const userDoc = await transaction.get(userDocRef);

				if (!userDoc.exists) {
					throw new functions.https.HttpsError(
						"not-found",
						"User does not exist."
					);
				}

				const userData = userDoc.data();
				if (userData?.role !== "teacher") {
					throw new functions.https.HttpsError(
						"permission-denied",
						"User is not authorized to create a classroom."
					);
				}

				// Verify that each instructor has the role 'teacher'
				const instructorIds = data.instructors;
				const instructorDataList = await Promise.all(
					instructorIds.map(async (instructorId: string) => {
						const instructorDocRef = db
							.collection("users")
							.doc(instructorId);
						const instructorDoc = await transaction.get(
							instructorDocRef
						);

						if (!instructorDoc.exists) {
							throw new functions.https.HttpsError(
								"not-found",
								`Instructor with ID ${instructorId} does not exist.`
							);
						}

						const instructorData = instructorDoc.data();
						if (instructorData?.role !== "teacher") {
							throw new functions.https.HttpsError(
								"permission-denied",
								`User with ID ${instructorId} is not authorized.`
							);
						}

						return {
							id: instructorId,
							fullName: instructorData.fullName,
						};
					})
				);

				// Prepare classroom data
				const classroomData = {
					name: data.name,
					startDate: data.startDate,
					endDate: data.endDate || null,
					description: data.description,
					price: data.price,
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
					createdBy: uid,
				};

				// Add classroom to Firestore
				const classroomRef = db
					.collection("classrooms")
					.doc(classroomId);
				transaction.set(classroomRef, classroomData);

				// Add classroom ID to each instructor's 'classrooms' subcollection
				instructorDataList.forEach((instructor) => {
					const { id, fullName } = instructor;
					const instructorClassroomRef = db
						.collection("users")
						.doc(id)
						.collection("classrooms")
						.doc(classroomId);
					transaction.set(instructorClassroomRef, {
						name: data.name,
						createdBy: uid,
						price: data.price,
						creatorName: fullName,
						createdAt: admin.firestore.FieldValue.serverTimestamp(),
					});

					// Add user to classroom's 'users' subcollection
					const classroomUserRef = db
						.collection("classrooms")
						.doc(classroomId)
						.collection("instructors")
						.doc(id);
					transaction.set(classroomUserRef, {
						fullName: fullName,
						joinedAt: admin.firestore.FieldValue.serverTimestamp(),
					});
				});
			});

			return { success: true, classroomId: classroomId };
		} catch (error: any) {
			throw new HttpsError("internal", error.message);
		}
	}
);

exports.addSectionIfInstructor = onCall(
	{ region: "asia-southeast1", cors: true },
	async (request: any) => {
		const { auth, data } = request;
		const { classroomId, sectionName } = data;

		if (!auth || !classroomId || !sectionName) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				"Missing required parameters or unauthorized"
			);
		}

		const teacherId = auth.uid; // Get the teacherId from the authenticated user

		try {
			// Reference to the classroom's instructors sub-collection
			const instructorsRef = db.collection(
				`classrooms/${classroomId}/instructors`
			);
			const instructorsSnap = await instructorsRef.get();

			// Check if the teacher is one of the instructors
			const isInstructor = instructorsSnap.docs.some(
				(doc: any) => doc.id === teacherId
			);

			if (!isInstructor) {
				throw new functions.https.HttpsError(
					"permission-denied",
					"User is not an instructor for this classroom"
				);
			}

			const classroomRef = db.collection("classrooms").doc(classroomId);

			await classroomRef.update({
				layout: admin.firestore.FieldValue.arrayUnion({
					type: "folder",
					name: sectionName, // This can be dynamically set
					files: [],
				}),
			});

			return {
				message: `New section "${sectionName}" added successfully.`,
			};
		} catch (error) {
			console.error("Error adding section to layout:", error);
			throw new functions.https.HttpsError(
				"internal",
				"Error adding section to layout"
			);
		}
	}
);
