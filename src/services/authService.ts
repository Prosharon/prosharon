import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth, functions } from "./firebase";
import { httpsCallable } from "firebase/functions";

interface authClient {
	signUp(email: string, password: string, fullName: string): Promise<void>;
	signIn(email: string, password: string): Promise<void>;
}

class firebaseAuthClient implements authClient {
	async signUp(
		email: string,
		password: string,
		fullName: string
	): Promise<void> {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			await updateProfile(user, { displayName: fullName });

			const updateUserProfile = httpsCallable(functions, 'assignStudentRole');
			await updateUserProfile({uid: user.uid, displayName: fullName}).then((data)=>{console.log(data)}).catch((e)=> console.log(e));

			console.log("User signed up and profile updated:", user);
		} catch (error) {
			console.error("Error signing up:", error);
			throw error; // Rethrow the error for the frontend to handle
		}
	}

	async signIn(email: string, password: string): Promise<void> {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	}
}

export type { authClient };
export { firebaseAuthClient };
