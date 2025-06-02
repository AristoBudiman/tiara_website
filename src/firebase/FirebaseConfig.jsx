// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlpPXuX_Mk8iB6hh8Q-RBZOvQ1cbQv4Jg",
  authDomain: "tiarabakeryapp.firebaseapp.com",
  projectId: "tiarabakeryapp",
  storageBucket: "tiarabakeryapp.firebasestorage.app",
  messagingSenderId: "977557940932",
  appId: "1:977557940932:web:42ad4f8097e565290e7791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }