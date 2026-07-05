// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIesKPY0GUXjK6NZYc_uGEk9YqlA1tL5s",
  authDomain: "rankpilot-ai-77263.firebaseapp.com",
  projectId: "rankpilot-ai-77263",
  storageBucket: "rankpilot-ai-77263.firebasestorage.app",
  messagingSenderId: "495052574306",
  appId: "1:495052574306:web:54cfd167378821182d0b3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)