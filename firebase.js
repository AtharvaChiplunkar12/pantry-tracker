// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtPcuWWmHx6XUpVph9PvsfwQxqyPV-miQ",
  authDomain: "pantry-tracker-2f9ec.firebaseapp.com",
  projectId: "pantry-tracker-2f9ec",
  storageBucket: "pantry-tracker-2f9ec.appspot.com",
  messagingSenderId: "996537791012",
  appId: "1:996537791012:web:15489303ec68c8ed1f5eb1",
  measurementId: "G-SVQ9J42HEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}