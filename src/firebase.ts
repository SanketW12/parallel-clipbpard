// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxGk0CV_AVUUATl26RiVPNTDBdWk8YUA4",
  authDomain: "parallelclipboard.firebaseapp.com",
  projectId: "parallelclipboard",
  storageBucket: "parallelclipboard.appspot.com",
  messagingSenderId: "668424523440",
  appId: "1:668424523440:web:04b3f3b80449c51749f575",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
