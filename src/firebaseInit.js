// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsvNgZsJQ_nP4TSNu1wu4xrazIarVRIio",
  authDomain: "busybuy-856c9.firebaseapp.com",
  projectId: "busybuy-856c9",
  storageBucket: "busybuy-856c9.appspot.com",
  messagingSenderId: "359568548347",
  appId: "1:359568548347:web:74a8d4b9d4480944cf2b5e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);