import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { firestore } from "./firebase";

interface dbClient {
	readInstructorClassrooms(uid: string): Promise<any>;
	getClassroom(uid:string): Promise<any>;
}

class firestoreClient implements dbClient {
	async readInstructorClassrooms(uid: string): Promise<any> {
		try {
			const collectionRef = collection(
				firestore,
				"users",
				uid,
				"classrooms"
			);
			const queryRef = await query(collectionRef, limit(6));
			const snapshots = await getDocs(queryRef);
			const classrooms = snapshots.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}));
			return classrooms;
		} catch (e) {
			alert("Error: " + e);
		}
	}
	async getClassroom(uid: string): Promise<any> {
		try {
			const classroomRef = await doc(firestore, "classrooms", uid);
			const classroom = await getDoc(classroomRef);
			return classroom.data(); 
		} catch(e) { 
			alert ("Error: " + e);
		}
	}
}

export type { dbClient };
export { firestoreClient };
