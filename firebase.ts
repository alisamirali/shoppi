// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIbZMiZC-Hz-wskHqqweRHaN34pctyzrU",
  authDomain: "shoppi-a60c2.firebaseapp.com",
  projectId: "shoppi-a60c2",
  storageBucket: "shoppi-a60c2.firebasestorage.app",
  messagingSenderId: "279627160905",
  appId: "1:279627160905:web:9a2f221cee352b21524e98",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
