import React from "react";
import ConsoleCard from "../ConsoleCard";
import { TbCoin, TbUsers } from "react-icons/tb";

const ClassroomStats = () => {
	return (
		<ConsoleCard className="w-full max-w-sm mx-auto">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
					Overview
				</h2>
			</div>

			<div className="flex justify-around items-center text-gray-800 dark:text-gray-300">
				{/* Total Enrolled */}
				<div className="flex items-center space-x-2">
					<TbUsers className="text-azure dark:text-azure" size={30} />
					<div>
						<p className="text-xl font-medium">350</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Enrolled
						</p>
					</div>
				</div>

				{/* Divider */}
				<div className="w-px h-10 bg-gray-300 dark:bg-gray-600"></div>

				{/* Total Earnings */}
				<div className="flex items-center space-x-2">
					<TbCoin className="text-azure dark:text-azure" size={30} />
					<div>
						<p className="text-xl font-medium">$12,500</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Earnings
						</p>
					</div>
				</div>
			</div>
		</ConsoleCard>
	);
};

export default ClassroomStats;
