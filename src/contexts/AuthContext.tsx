// src/app/contexts/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
	profile: any;
	user: any;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [profile, setProfile] = useState<any>(null);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const getUserProfile = async (uid: string) => {
		const userRef = doc(firestore, "users", uid);
		await getDoc(userRef).then((res) => {
			setProfile(res.data());
		}).catch((e) => {
			alert("Error: " + e);
		})
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			try {
				if (user?.uid) {
					setUser(user);
					getUserProfile(user.uid).then(()=> setLoading(false));
				} else {
					setUser(null);
					setLoading(false);
				}
			} catch (e) {
				alert("Error: " + e);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ profile, user, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
