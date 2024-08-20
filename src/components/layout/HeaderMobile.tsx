import React from "react";
import { TbMenu2 } from "react-icons/tb";

interface props {
	toggleSidebar: () => void;
}

const HeaderMobile = ({toggleSidebar}: props) => {
	return (
		<header className="bg-gray-200 dark:bg-gray-800 p-4 md:hidden relative">
			<button
				onClick={toggleSidebar}
				className="p-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
			>
				<TbMenu2 />
			</button>
		</header>
	);
};

export default HeaderMobile;
