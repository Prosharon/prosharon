import ConsoleCard from "@/components/ui/ConsoleCard";
import { TbChalkboard, TbChartInfographic, TbGraph } from "react-icons/tb";

const Classrooms = () => {
	return (
		<div className="flex gap-6 flex-1 flex-wrap">
			<div className="flex flex-col gap-6">
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
									stroke-width="4"
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
									stroke-width="4"
									stroke-linecap="round"
								/>
								<line
									x1="58"
									y1="17.5"
									x2="72"
									y2="17.5"
									stroke="#299DFF"
									stroke-width="4"
									stroke-linecap="round"
								/>
							</svg>
						</div>
						{/* Text */}
						<span className="text-2xl font-bold text-azure">
							Create classroom
						</span>
					</div>
				</ConsoleCard>
				<ConsoleCard className="flex-1 flex flex-col w-72 md:w-96">
					<div className="flex items-center gap-2 text-azure">
						<span className="text-3xl font-bold">Statistics</span>
						<TbGraph className="h-8 w-8" />
					</div>

					<div className="flex flex-1 items-center">
						<div className="flex gap-4 flex-wrap flex-1 justify-center text-black">
							<div className="flex flex-col items-center justify-center font-bold bg-coral md:w-40 md:h-40 w-28 h-28 rounded-xl shrink-0">
								<p className="text-3xl">29</p>
								Total
							</div>
							<div className="flex flex-col items-center justify-center font-bold bg-goldenrod md:w-40 md:h-40 w-28 h-28 rounded-xl shrink-0">
								<p className="text-3xl">7</p>
								Public
							</div>
							<div className="flex flex-col items-center justify-center font-bold bg-paleGreen md:w-40 md:h-40 w-28 h-28 rounded-xl shrink-0">
								<p className="text-3xl">5</p>
								Running
							</div>
							<div className="flex flex-col items-center justify-center font-bold bg-turquoise md:w-40 md:h-40 w-28 h-28 rounded-xl shrink-0">
								<p className="text-3xl">24</p>
								Idle
							</div>
						</div>
					</div>
				</ConsoleCard>
			</div>
			<ConsoleCard className="flex-1">
				<div className="flex items-center gap-2 text-azure">
					<span className="text-3xl font-bold">My classroom(s)</span>
					<TbChalkboard className="h-8 w-8" />
				</div>
			</ConsoleCard>
		</div>
	);
};

export default Classrooms;
