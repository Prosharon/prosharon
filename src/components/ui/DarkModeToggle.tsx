"use client";

import { useState, useEffect } from "react";
import { TbMoon } from "react-icons/tb";
import { TbSunHigh } from "react-icons/tb";

export default function DarkModeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Check if there's a stored theme preference
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			setIsDarkMode(storedTheme === "dark");
			document.documentElement.classList.toggle(
				"dark",
				storedTheme === "dark"
			);
		} else {
			// Default to system preference
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setIsDarkMode(systemPrefersDark);
			document.documentElement.classList.toggle(
				"dark",
				systemPrefersDark
			);
		}
	}, []);

	const toggleDarkMode = () => {
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
		setIsDarkMode(!isDarkMode);
	};

	return (
		<div className="flex">
		<button
			onClick={toggleDarkMode}
			className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white rounded-md"
		>
			{isDarkMode ? <TbMoon /> : <TbSunHigh />}
		</button>
		</div>
	);
}
