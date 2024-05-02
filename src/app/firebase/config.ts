// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpQPiFPib7wamYLWSfA5w0QEGDNhn7Iyc",
  authDomain: "fitcall.firebaseapp.com",
  projectId: "fitcall",
  storageBucket: "fitcall.appspot.com",
  messagingSenderId: "715076318820",
  appId: "1:715076318820:web:9a7253d0f9d0f4418bd171",
  measurementId: "G-797DBZKY5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
