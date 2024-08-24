"use client";
import { useState } from "react";
import { functions } from "@/services/firebase";
import { httpsCallable } from "firebase/functions";

export default function ClassroomForm() {
	const [instructors, setInstructors] = useState([""]);

	const addInstructor = () => {
		if (instructors.length >= 5) {
			alert("Maximum number of instructors reached.");
			return;
		}
		setInstructors([...instructors, ""]);
	};

	const removeInstructor = (index: number) => {
		if (instructors.length > 1) {
			setInstructors(instructors.filter((_, i) => i !== index));
		}
	};

	const updateInstructor = (index: number, value: string) => {
		const updatedInstructors = [...instructors];
		updatedInstructors[index] = value;
		setInstructors(updatedInstructors);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		const name = (
			document.getElementById("classroom-name") as HTMLInputElement
		).value;
		const startDate = (
			document.getElementById("start-date") as HTMLInputElement
		).value;
		const endDate = (
			document.getElementById("end-date") as HTMLInputElement
		).value;
		const description = (
			document.getElementById("description") as HTMLInputElement
		).value;
		const price = (document.getElementById("price") as HTMLInputElement)
			.value;

		const createClassroom = httpsCallable(functions, 'createClassroom');
			await createClassroom({
				name: name,
				instructors: instructors,
				startDate: startDate,
				endDate: endDate,
				description: description,
				price: price,
			}).then(data => {
        console.log(data);
      }).catch((e:any)=> {
		alert(e.message);
	  });
	};

	return (
		<div className="flex justify-center bg-white dark:bg-gray-900 rounded-3xl md:w-3/4">
			<form className="grow-0 w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-6" onSubmit={submitHandler}>
				<h2 className="text-2xl font-bold text-black dark:text-white mb-4">
					Create New Classroom
				</h2>

				{/* Classroom Name */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						Classroom Name
					</label>
					<input
						type="text"
						id="classroom-name"
						className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all"
						required
					/>
				</div>

				{/* Instructor ID(s) */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						Instructor ID(s)
					</label>
					{instructors.map((instructor, index) => (
						<div key={index} className="flex space-x-2 mb-2">
							<input
								type="text"
								value={instructor}
								onChange={(e) =>
									updateInstructor(index, e.target.value)
								}
								className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all flex-1"
								required
							/>
							{instructors.length > 1 && (
								<button
									type="button"
									onClick={() => removeInstructor(index)}
									className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg font-bold"
								>
									Remove
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={addInstructor}
						className="text-white bg-azure hover:bg-azure/90 px-3 py-2 rounded-lg font-bold"
					>
						Add Instructor
					</button>
				</div>

				{/* Classroom Start Date */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						Start Date (Optional)
					</label>
					<input
						id="start-date"
						type="date"
						className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all"
					/>
				</div>

				{/* Classroom End Date (Optional) */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						End Date (Optional)
					</label>
					<input
						id="end-date"
						type="date"
						className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all"
					/>
				</div>

				{/* Description */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						Description
					</label>
					<textarea
						id="description"
						className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all"
						rows={4}
						required
					></textarea>
				</div>

				{/* Price */}
				<div className="flex flex-col">
					<label className="text-black dark:text-gray-300 mb-2 font-bold">
						Price (in Taka)
					</label>
					<input
						id="price"
						type="number"
						className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all"
						required
					/>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-azure text-white hover:bg-azure/90 px-4 py-2 rounded-lg"
					>
						Create Classroom
					</button>
				</div>
			</form>
		</div>
	);
}
