// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYRBE-pC4VOPstm8A7PaN82HxJg7Fg0m8",
  authDomain: "madhavsewasociety-b977b.firebaseapp.com",
  projectId: "madhavsewasociety-b977b",
  storageBucket: "madhavsewasociety-b977b.appspot.com",
  messagingSenderId: "893839167830",
  appId: "1:893839167830:web:422dbb2f561f41bc3006f7",
  measurementId: "G-D1CD94F6GJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
