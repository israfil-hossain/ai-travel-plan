// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnXuVTC_7zAYIUxgjQDBTXjieF36M3BbQ",
    authDomain: "ai-travel-planner-c198b.firebaseapp.com",
    projectId: "ai-travel-planner-c198b",
    storageBucket: "ai-travel-planner-c198b.appspot.com",
    messagingSenderId: "498091557195",
    appId: "1:498091557195:web:61492cc2820acdd75568ce",
    measurementId: "G-MGLQK21N2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 