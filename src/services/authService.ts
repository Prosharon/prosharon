import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {auth, firestore} from "./firebase";
import { doc, setDoc } from "firebase/firestore";

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
		console.log(email, password, fullName);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			console.log("User signed up and profile updated:", user);
		} catch (error) {
			console.error("Error signing up:", error);
			throw error; // Rethrow the error for the frontend to handle
		}
	}

	async signIn (email:string, password:string): Promise<void> {
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
	};
}

export type { authClient };
export { firebaseAuthClient };
