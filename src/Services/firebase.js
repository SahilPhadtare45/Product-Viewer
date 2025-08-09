// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj1cKpAHNOqbKl1gDucC4H8BQRWbPUUsM",
  authDomain: "product-viewer-7c203.firebaseapp.com",
  projectId: "product-viewer-7c203",
  storageBucket: "product-viewer-7c203.firebasestorage.app",
  messagingSenderId: "815512777443",
  appId: "1:815512777443:web:c4e5904e717d3cd6988bd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
