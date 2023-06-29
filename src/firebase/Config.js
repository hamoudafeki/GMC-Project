// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQVtdTJCWqhTEQu3Wk6SokcMw7GH77dNc",
  authDomain: "project-gmc-2b8d2.firebaseapp.com",
  projectId: "project-gmc-2b8d2",
  storageBucket: "project-gmc-2b8d2.appspot.com",
  messagingSenderId: "735421308141",
  appId: "1:735421308141:web:2719108333584b0ae080e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
