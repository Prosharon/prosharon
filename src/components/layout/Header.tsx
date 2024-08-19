"use client";
import Link from "next/link";
import DarkModeToggle from "../ui/DarkModeToggle";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
	const [user, setUser] = useState<any>(null);
	const router = useRouter();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
	});

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
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6">
				<a
					href="https://flowbite.com/"
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
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-300 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<DarkModeToggle />
						</li>
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
							<li>
								<p
									onClick={signOutUser}
									className="block rounded md:border-0 text-azure md:hover:text-black md:p-0 md:dark:hover:text-white hover:cursor-pointer"
								>
									{user.displayName}
								</p>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
