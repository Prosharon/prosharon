// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa9mzfAhSW4rAvf_aGVulxbRkQzt3t7bA",
  authDomain: "prosharon-2024.firebaseapp.com",
  projectId: "prosharon-2024",
  storageBucket: "prosharon-2024.appspot.com",
  messagingSenderId: "857447560818",
  appId: "1:857447560818:web:3b57250250a6cc238534eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);