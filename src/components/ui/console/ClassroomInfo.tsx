"use client";
import ConsoleCard from "../ConsoleCard";
import {
	TbBook2,
	TbCalendar,
	TbEdit,
	TbUser,
	TbUsersGroup,
} from "react-icons/tb";

interface props {
	classroomData: GeneralDocument;
}

const ClassroomInfo = ({classroomData}: props) => {
	return (
		<ConsoleCard className="w-full max-w-sm mx-auto">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
					Classroom Info
				</h2>
				<TbEdit
					className="text-azure dark:text-azure cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
					onClick={() => alert("Edit button clicked")}
					size={20}
				/>
			</div>

			<div className="space-y-4 text-gray-800 dark:text-gray-300">
				{/* Classroom Name */}
				<div className="flex items-center space-x-2">
					<TbBook2 className="text-azure dark:text-azure" size={20} />
					<p className="text-lg font-semibold">
						{classroomData.name}
					</p>
				</div>

				{/* Description */}
				<div className="flex items-start space-x-2">
					<p className="text-gray-700 dark:text-gray-400">
						{classroomData.description}
					</p>
				</div>

				{/* Dates */}
				<div className="flex items-center space-x-2">
					<TbCalendar
						className="text-azure dark:text-azure"
						size={20}
					/>
					<p>
						<span className="font-semibold">Start:</span> {classroomData.startDate}
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<TbCalendar
						className="text-azure dark:text-azure"
						size={20}
					/>
					<p>
						<span className="font-semibold">End:</span> {classroomData.endDate}
					</p>
				</div>

				{/* Instructors */}
				<div className="bg-gray-100 p-4 rounded-3xl">
					<div className="font-semibold flex items-center space-x-2">
						<TbUsersGroup className="text-azure" />
						<p>Instructor(s)</p>
					</div>
					<div className="ml-6 mt-4">
					{classroomData.instructors ? classroomData.instructors.map((instructor: GeneralDocument) => (
						<div key={instructor.id} className="flex items-center space-x-2 mb-2">
						<TbUser
							className="text-azure dark:text-azure"
							size={20}
						/>
						<p>{instructor.fullName}</p>
					</div>
					)):""}
					</div>
				</div>
			</div>
		</ConsoleCard>
	);
};

export default ClassroomInfo;
