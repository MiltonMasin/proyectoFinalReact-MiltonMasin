import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZHo9DlncqPiXPswLKr1dk1OzIf6mID8I",
  authDomain: "proyectofinalmasinmilton-react.firebaseapp.com",
  projectId: "proyectofinalmasinmilton-react",
  storageBucket: "proyectofinalmasinmilton-react.appspot.com",
  messagingSenderId: "369604035737",
  appId: "1:369604035737:web:7892f1dd42c999f4c9a408"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)