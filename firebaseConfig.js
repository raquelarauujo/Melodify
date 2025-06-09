// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjOnzq83h_QyYOPhjTbY6MKvn02MaNugE",
  authDomain: "melodify-967e2.firebaseapp.com",
  projectId: "melodify-967e2",
  storageBucket: "melodify-967e2.firebasestorage.app",
  messagingSenderId: "433201518603",
  appId: "1:433201518603:web:057926335ead7b0d7c8f0e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
