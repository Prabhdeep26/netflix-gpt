// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "netflixgpt-b601c.firebaseapp.com",
	projectId: "netflixgpt-b601c",
	storageBucket: "netflixgpt-b601c.firebasestorage.app",
	messagingSenderId: "542543964905",
	appId: "1:542543964905:web:691e7cf18ea9fa94671e78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
