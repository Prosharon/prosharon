import {
	TbDeviceAnalytics,
	TbLayoutDashboard,
	TbSettings,
	TbUser,
} from "react-icons/tb";
import DarkModeToggle from "../ui/DarkModeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface props {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}

const Sidebar = ({sidebarOpen, toggleSidebar}:props) => {
	const pathname = usePathname();
	return (
		<div
			className={`fixed inset-y-0 left-0 w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-transform duration-300 ease-in-out ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 z-40`}
		>
			<div className="flex flex-col h-full p-4">
				<header className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
						Prosharon
					</h1>
					<button
						onClick={toggleSidebar}
						className="p-2 md:hidden rounded-md bg-gray-300 dark:bg-gray-700"
					>
						<svg
							className="w-6 h-6"
							fill="#299DFF"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</header>
				<nav className="flex-grow">
					<ul className="space-y-2">
						<li>
							<Link
								href="/console/dashboard"
								className={"flex items-center py-2 px-4 rounded font-semibold " + (!pathname.endsWith("dashboard")? "hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-azure text-white shadow-md scale-105")}
							>
								<TbLayoutDashboard className="mr-2" />
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								href="/console/analytics"
								className={"flex items-center py-2 px-4 rounded font-semibold " + (!pathname.endsWith("analytics")? "hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-azure text-white shadow-md scale-105")}
							>
								<TbDeviceAnalytics className="mr-2" />
								Analytics
							</Link>
						</li>
						<li>
							<Link
								href="/console/settings"
								className={"flex items-center py-2 px-4 rounded font-semibold " + (!pathname.endsWith("settings")? "hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-azure text-white shadow-md scale-105")}
							>
								<TbSettings className="mr-2" />
								Settings
							</Link>
						</li>
						<li>
							<Link
								href="/console/users"
								className={"flex items-center py-2 px-4 rounded font-semibold " + (!pathname.endsWith("users")? "hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-azure text-white shadow-md scale-105")}
							>
								<TbUser className="mr-2" />
								Users
							</Link>
						</li>
					</ul>
				</nav>
				<DarkModeToggle />
			</div>
		</div>
	);
};

export default Sidebar;
