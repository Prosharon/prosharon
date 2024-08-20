"use client";
import Link from "next/link";
import DarkModeToggle from "../ui/DarkModeToggle";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/services/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderDropdown from "../ui/HeaderDropdown";
import { doc, getDoc } from "firebase/firestore";
import { TbTableRow } from "react-icons/tb";
import { TbMenu2 } from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
	const { profile, user, loading } = useAuth();

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 font-semibold">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6">
				<a
					href="#"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl whitespace-nowrap dark:text-white">
						Prosharon
					</span>
				</a>
				<button
					onClick={() => {
						document
							.getElementById("navbar-default")
							?.classList.toggle("hidden");
					}}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<TbMenu2 />
				</button>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="flex flex-col space-y-1 items-center p-4 md:p-0 mt-4 border border-gray-300 rounded-lg bg-gray-100 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<DarkModeToggle />
						</li>
						{profile?.role !=="teacher" ? "" : <li className="bg-azure text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer"><Link href="/console" className="flex items-center gap-1"><TbTableRow /> Console</Link></li>}
						{!user ? (
							<li>
								<Link
									href="/login"
									className="block rounded md:border-0 text-azure md:hover:text-black md:p-0 md:dark:hover:text-white"
								>
									Login/Signup
								</Link>
							</li>
						) : (
							<li className="relative">
								<HeaderDropdown user={user.displayName} />
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
