'use client';
import RegisterForm from "@/components/ui/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (user?.uid) {
			router.push('/');
		}
	  }, [loading]);
	if (loading) return <div>loading...</div>;
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Prosharon
				</a>
				<RegisterForm/>
			</div>
		</section>
	);
};

export default page;
