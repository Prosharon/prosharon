'use client';
import HeaderMobile from "@/components/layout/HeaderMobile";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface props {
	children: ReactNode;
}

const Console = ({children} : props) => {

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { profile, user, loading } = useAuth();
	const router = useRouter();
	useEffect(() => {
		console.log(!loading, profile?.role);
		console.log(!loading && profile?.role !== 'teacher');
		if (!loading && profile?.role !== 'teacher') {
			router.push('/');
		} else if (!loading) {
			router.push('/console/dashboard');
		}
	  }, [loading]);
	if (loading) return <div>loading...</div>;

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<div
			className={`flex min-h-screen ${
				sidebarOpen ? "overflow-hidden" : ""
			}`}
		>
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
			{/* Main content */}
			<div className="flex-1 md:ml-64 flex flex-col">
				{/* Header for mobile */}
				<HeaderMobile toggleSidebar={toggleSidebar} />

				{/* Main content area */}
				<main className="flex-1 flex flex-col justify-center items-center p-8">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Console;
