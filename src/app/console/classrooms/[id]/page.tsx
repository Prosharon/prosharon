"use client";
import ClassroomInfo from "@/components/ui/console/ClassroomInfo";
import ClassroomLayout from "@/components/ui/console/ClassroomLayout";
import ClassroomStats from "@/components/ui/console/ClassroomStats";
import { firestore } from "@/services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Params {
	id: string;
}

const ClassroomPage = ({ params }: { params: Params }) => {
	const [classroomData, setClassroomData] = useState<GeneralDocument>({});

	useEffect(() => {
		getClassroomData(params.id);
	}, [params.id]);

	async function getClassroomData(id: string) {
		try {
			const docRef = doc(firestore, "classrooms", id);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				return null;
			}
			setClassroomData(docSnap.data());
			const instructorsRef = collection(
				firestore,
				"classrooms",
				id,
				"instructors"
			);
			const instructorsSnap = await getDocs(instructorsRef);
			const instructors: GeneralDocument[] = [];
			instructorsSnap.forEach((doc) => {
				const instructorData = doc.data(); // Get the data for each document
				instructors.push({
					id: doc.id, // Optionally store the document ID
					...instructorData, // Spread the document data into the array
				});
			});
			const classroom = {
				id: id,
				instructors: instructors,
				...docSnap.data(),
			};
			setClassroomData(classroom);
		} catch (error) {
			// alert("Error fetching document:" + error);
			return null;
		}
	}

	if (!document) {
		return <div>Document not found</div>;
	}

	return (
		<div className="flex gap-6 flex-1 flex-wrap">
			<div className="flex flex-col gap-6">
				<ClassroomInfo classroomData={classroomData} />
				<ClassroomStats />
			</div>
			<ClassroomLayout classroomId={classroomData.id}/>
		</div>
	);
};

export default ClassroomPage;
