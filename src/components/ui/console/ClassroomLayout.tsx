"use client";
import React, { useState } from "react";
import ConsoleCard from "../ConsoleCard";
import {
	TbFile,
	TbFileText,
	TbFileUpload,
	TbFolderPlus,
	TbTrash,
	TbVideoPlus,
	TbVideo,
	TbFolder,
	TbFileTypePdf,
} from "react-icons/tb";
import { auth, functions } from "@/services/firebase";
import CreateFolderModal from "../modals/CreateFolderModal";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";

interface props {
	classroomId: GeneralDocument;
	classroomLayoutData: GeneralDocument[];
}

const ClassroomLayout = ({
	classroomId,
	classroomLayoutData,
}: props) => {
	const router = useRouter();
	const [isCreateFolderOpen, setIsCreateFolderOpen] =
		useState<boolean>(false);
	const makeFolder = async () => {
		const addSectionIfInstructor = httpsCallable(
			functions,
			"addSectionIfInstructor"
		);
		try {
			const result = await addSectionIfInstructor({
				classroomId: classroomId,
				sectionName: (
					document.getElementById("folder-name") as HTMLInputElement
				).value,
			}).then(() => location.reload());
		} catch (e: any) {
			alert(e);
		}
	};
	console.log(classroomLayoutData);
	return (
		<ConsoleCard
			className="md:flex-1 w-full max-w-full"
			notHoverable={true}
		>
			<CreateFolderModal
				isOpen={isCreateFolderOpen}
				onClose={() => setIsCreateFolderOpen(false)}
				makeFolder={makeFolder}
			/>
			<div className="flex flex-wrap justify-between items-center mb-6 space-y-4 md:space-y-0">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 w-full md:w-auto">
					Course Layout - Vectors
				</h2>
				<div className="flex flex-wrap justify-end space-y-3 space-x-0 md:space-y-0 md:space-x-3 w-full md:w-auto font-bold text-sm">
					{/* Upload Buttons */}
					<button className="bg-azure dark:bg-azure text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-opacity-90 transition w-full md:w-auto">
						<TbVideoPlus className="w-5 h-5" />
						<span>Upload Video</span>
					</button>
					<button className="bg-azure dark:bg-azure text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-opacity-90 transition w-full md:w-auto">
						<TbFileUpload className="w-5 h-5" />
						<span>Upload Files</span>
					</button>
					<button
						onClick={() => setIsCreateFolderOpen(true)}
						className="bg-azure dark:bg-azure text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-opacity-90 transition w-full md:w-auto"
					>
						<TbFolderPlus className="w-5 h-5" />
						<span>Make Folder</span>
					</button>
				</div>
			</div>

			<div className="space-y-6 text-gray-800 dark:text-gray-300">
				{classroomLayoutData ? classroomLayoutData.map((entity:any) => {
					if (entity.type==="folder") {
						return (
							<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
								<div className="flex justify-between items-center mb-4">
									<div className="flex items-center space-x-3">
										<TbFolder
											className="text-yellow-500"
											size={24}
										/>
										<p className="text-md font-semibold break-words whitespace-normal">
											{entity.name}
										</p>
									</div>
									<button className="text-red-500 hover:text-red-700 transition">
										<TbTrash size={20} />
									</button>
								</div>
								{/* <div className="ml-6 space-y-4">
									<div className="flex justify-between items-center">
										<div className="flex items-center space-x-3">
											<TbFileText
												className="text-azure"
												size={20}
											/>
											<p className="text-sm break-words whitespace-normal">
												Why vectors
											</p>
										</div>
										<button className="text-red-500 hover:text-red-700 transition">
											<TbTrash size={20} />
										</button>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex items-center space-x-3">
											<TbVideo
												className="text-slate-500"
												size={20}
											/>
											<p className="text-sm break-words whitespace-normal">
												Vector applications.mp4
											</p>
										</div>
										<button className="text-red-500 hover:text-red-700 transition">
											<TbTrash size={20} />
										</button>
									</div>
								</div> */}
							</div>
						);
					}
				}): ""}
				{/* <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
					<div className="flex items-center space-x-3">
						<TbVideo
							className="text-slate-500"
							size={24}
						/>
						<p className="text-md font-medium break-words whitespace-normal">
							Introduction to vectors.mp4
						</p>
					</div>
					<button className="text-red-500 hover:text-red-700 transition">
						<TbTrash size={20} />
					</button>
				</div>
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center space-x-3">
							<TbFolder
								className="text-yellow-500"
								size={24}
							/>
							<p className="text-md font-semibold break-words whitespace-normal">
								Vector overview
							</p>
						</div>
						<button className="text-red-500 hover:text-red-700 transition">
							<TbTrash size={20} />
						</button>
					</div>
					<div className="ml-6 space-y-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<TbFileText
									className="text-azure"
									size={20}
								/>
								<p className="text-sm break-words whitespace-normal">
									Why vectors
								</p>
							</div>
							<button className="text-red-500 hover:text-red-700 transition">
								<TbTrash size={20} />
							</button>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<TbVideo
									className="text-slate-500"
									size={20}
								/>
								<p className="text-sm break-words whitespace-normal">
									Vector applications.mp4
								</p>
							</div>
							<button className="text-red-500 hover:text-red-700 transition">
								<TbTrash size={20} />
							</button>
						</div>
					</div>
				</div>
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center space-x-3">
							<TbFolder
								className="text-yellow-500"
								size={24}
							/>
							<p className="text-md font-semibold break-words whitespace-normal">
								Geometric representations of vectors
							</p>
						</div>
						<button className="text-red-500 hover:text-red-700 transition">
							<TbTrash size={20} />
						</button>
					</div>
					<div className="ml-6 space-y-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<TbVideo
									className="text-slate-500"
									size={20}
								/>
								<p className="text-sm break-words whitespace-normal">
									something.mp4
								</p>
							</div>
							<button className="text-red-500 hover:text-red-700 transition">
								<TbTrash size={20} />
							</button>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<TbVideo
									className="text-slate-500"
									size={20}
								/>
								<p className="text-sm break-words whitespace-normal">
									something else.mp4
								</p>
							</div>
							<button className="text-red-500 hover:text-red-700 transition">
								<TbTrash size={20} />
							</button>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<TbFileTypePdf
									className="text-red-500"
									size={20}
								/>
								<p className="text-sm break-words whitespace-normal">
									notes.pdf
								</p>
							</div>
							<button className="text-red-500 hover:text-red-700 transition">
								<TbTrash size={20} />
							</button>
						</div>
					</div>
				</div> */}
			</div>
		</ConsoleCard>
	);
};

export default ClassroomLayout;
