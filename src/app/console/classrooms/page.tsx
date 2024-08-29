import MyClassrooms from "@/components/ui/console/MyClassrooms";
import ConsoleCard from "@/components/ui/ConsoleCard";
import Link from "next/link";
import { TbGraph } from "react-icons/tb";

const Classrooms = () => {
	return (
		<div className="flex gap-6 flex-1 flex-wrap">
			<div className="flex flex-col gap-6">
				<Link href="/console/classrooms/create">
				<ConsoleCard className="w-72 md:w-96">
					{/* Icon placeholder */}
					<div className="flex flex-col items-center">
						<div className="">
							{/* Replace with your icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 80 80"
								width="80"
								height="80"
							>
								<rect
									x="10"
									y="15"
									width="60"
									height="30"
									fill="#333"
									stroke="#8B4513"
									strokeWidth="4"
									rx="4"
									ry="4"
								/>
								<rect
									x="18"
									y="45"
									width="4"
									height="10"
									fill="#8B4513"
								/>
								<rect
									x="58"
									y="45"
									width="4"
									height="10"
									fill="#8B4513"
								/>
								<line
									x1="65"
									y1="10"
									x2="65"
									y2="25"
									stroke="#299DFF"
									strokeWidth="4"
									strokeLinecap="round"
								/>
								<line
									x1="58"
									y1="17.5"
									x2="72"
									y2="17.5"
									stroke="#299DFF"
									strokeWidth="4"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						{/* Text */}
						<span className="text-2xl font-bold text-black dark:text-white">
							Create classroom
						</span>
					</div>
				</ConsoleCard>
				</Link>
				<ConsoleCard className="flex flex-col gap-4 w-72 md:w-96">
					<div className="flex items-center gap-2 text-black dark:text-white">
						<span className="text-3xl font-bold">Statistics</span>
						<TbGraph className="h-8 w-8" />
					</div>

					<div className="flex flex-col gap-4 justify-center text-white">
						<div className="flex gap-4 flex-1 min-h-36">
							<div className="flex flex-1 flex-col items-center justify-center font-bold bg-gray-200 dark:bg-gray-800 text-azure md:w-40 w-28 rounded-xl shrink-0">
								<p className="text-3xl">29</p>
								Total
							</div>

							<div className="flex flex-col items-center justify-center font-bold bg-gray-200 dark:bg-gray-800 text-azure md:w-40 w-28 rounded-xl shrink-0">
								<p className="text-3xl">7</p>
								Public
							</div>
						</div>
						<div className="flex gap-4 flex-1 min-h-36">
							<div className="flex flex-col items-center justify-center font-bold bg-gray-200 dark:bg-gray-800 text-azure md:w-40 w-28 rounded-xl shrink-0">
								<p className="text-3xl">5</p>
								Running
							</div>
							<div className="flex flex-col items-center justify-center font-bold bg-gray-200 dark:bg-gray-800 text-azure md:w-40 w-28 rounded-xl shrink-0">
								<p className="text-3xl">24</p>
								Idle
							</div>
						</div>
					</div>
				</ConsoleCard>
			</div>
			<MyClassrooms/>
		</div>
	);
};

export default Classrooms;
