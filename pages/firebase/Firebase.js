// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGttmEp66IfJAPtwv0i_xqM4qwaaK1Dnc",
  authDomain: "code-golf-da0a8.firebaseapp.com",
  projectId: "code-golf-da0a8",
  storageBucket: "code-golf-da0a8.appspot.com",
  messagingSenderId: "561451899318",
  appId: "1:561451899318:web:b03d587db42b78419fc917",
  measurementId: "G-80G7JVFKHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth data
export const auth = getAuth(app);

