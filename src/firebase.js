// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdHq--CkvZeLksJPU4EYdq6TJziiEw_5Y",
  authDomain: "todo-app-1860f.firebaseapp.com",
  projectId: "todo-app-1860f",
  storageBucket: "todo-app-1860f.appspot.com",
  messagingSenderId: "806356430381",
  appId: "1:806356430381:web:c21710f64a43d26ad312a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)