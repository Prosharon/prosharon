import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface props {
	user: string;
}

const HeaderDropdown = ({user}: props) => {
	const router = useRouter();

	const signOutUser = () => {
		signOut(auth)
			.then(() => {
				router.push("/login");
			})
			.catch((error) => {
				alert("Error: " + error);
			});
	};

	return (
		<div>
			<button
				type="button"
				className="flex items-center space-x-2 text-gray-700 dark:text-white"
				onClick={() =>
					(
						document.getElementById("dropdown-menu") as HTMLElement
					).classList.toggle("hidden")
					
				}
			>
				
				<span>{user}</span>
				<svg
					className="w-4 h-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 7l5 5 5-5"
					/>
				</svg>
			</button>
			<div
				id="dropdown-menu"
				className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hidden"
			>
				<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
					<li>
						<Link
							href="/profile"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Profile
						</Link>
					</li>
					<li>
						<Link
							href="/settings"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Settings
						</Link>
					</li>
					<li>
						<button
							onClick={() => signOutUser()}
							className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HeaderDropdown;
