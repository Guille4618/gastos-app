import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2O5b6WeXGyfhQyf-InxK-vbAofTEqjZY",
  authDomain: "gastos-app-24692.firebaseapp.com",
  projectId: "gastos-app-24692",
  storageBucket: "gastos-app-24692.firebasestorage.app",
  messagingSenderId: "1084687203670",
  appId: "1:1084687203670:web:5dfa219176bc80553beaf7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);