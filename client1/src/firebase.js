// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-7da91.firebaseapp.com",
  projectId: "real-estate-app-7da91",
  storageBucket: "real-estate-app-7da91.appspot.com",
  messagingSenderId: "921376341519",
  appId: "1:921376341519:web:53e11d65475b8799dead7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
