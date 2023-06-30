// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2SFytcd43UjdKzgcMON_0Te6ihiCv9TI",
    authDomain: "social-minds.firebaseapp.com",
    projectId: "social-minds",
    storageBucket: "social-minds.appspot.com",
    messagingSenderId: "733066402148",
    appId: "1:733066402148:web:f1d31f19dc1218e506c271",
    measurementId: "G-DYN46CYT95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app as initFirebase}