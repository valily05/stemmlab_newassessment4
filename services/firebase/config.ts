import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAJ-vve7Srt2QWw5JBipEp7hCE7U6jPGLk",
  authDomain: "stemmlab-assessment4-b5ae2.firebaseapp.com",
  projectId: "stemmlab-assessment4-b5ae2",
  storageBucket: "stemmlab-assessment4-b5ae2.firebasestorage.app",
  messagingSenderId: "388575777831",
  appId: "1:388575777831:web:8eea3e1b5be8fe6f6c2a02",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);