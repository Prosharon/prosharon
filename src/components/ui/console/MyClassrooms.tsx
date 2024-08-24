"use client";
import { TbChalkboard } from "react-icons/tb";
import ConsoleCard from "../ConsoleCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { dbClient, firestoreClient } from "@/services/classroomsService";

const colorClasses: Record<string, string> = {
	azure: "bg-azure",
	amber: "bg-amber",
	crimson: "bg-crimson",
	indigo: "bg-indigo",
};

const MyClassrooms = () => {
	const { user } = useAuth();
	const dbClient: dbClient = new firestoreClient();
	const [classrooms, setClassrooms] = useState<any[]>([]);
	useEffect(() => {
		dbClient
			.readInstructorClassrooms(user.uid)
			.then((data) => setClassrooms(data));
	}, []);
	return (
		<ConsoleCard notHoverable={true} className="flex-1">
			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-2 text-black dark:text-white">
					<span className="text-3xl font-bold">My classroom(s)</span>
					<TbChalkboard className="h-8 w-8" />
				</div>
				<ul className="flex flex-wrap">
					{classrooms.map((classroom, index) => {
						const color =
							Object.keys(colorClasses)[
								index % Object.keys(colorClasses).length
							];
						return (
							<li
								key={index}
								className="p-2 w-full md:w-1/3"
							>
								<div className={`flex flex-col justify-between p-4 h-48 rounded-xl hover:cursor-pointer text-white font-bold shadow-md ${colorClasses[color]}`}>
									<div className="text-xl h-2/5 overflow-hidden text-ellipsis">{classroom.data.name}</div>
									<div className="text-lef h-1/5 flex items-end">Created by&nbsp;{classroom.data.creatorName}</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</ConsoleCard>
	);
};

export default MyClassrooms;
