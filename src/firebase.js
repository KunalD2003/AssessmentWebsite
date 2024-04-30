// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCAI3Du9IawS_52mMQtwZRbV_rNvci97c",
  authDomain: "digital-recruitment-44f66.firebaseapp.com",
  projectId: "digital-recruitment-44f66",
  storageBucket: "digital-recruitment-44f66.appspot.com",
  messagingSenderId: "226538096640",
  appId: "1:226538096640:web:f70f760570fa6945df30e5",
  measurementId: "G-8XRZ1D67WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
export {app,auth};  