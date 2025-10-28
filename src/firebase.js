// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ مهم جدًا

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDosJvnIDu9Ronovg5zcHs3Xq7UkFYTrDs",
    authDomain: "elharafesh-b8066.firebaseapp.com",
    databaseURL: "https://elharafesh-b8066-default-rtdb.firebaseio.com",
    projectId: "elharafesh-b8066",
    storageBucket: "elharafesh-b8066.firebasestorage.app",
    messagingSenderId: "250437766537",
    appId: "1:250437766537:web:bd513de6004f0020902558",
    measurementId: "G-2WFM4T8MHK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // ✅ ربط قاعدة البيانات

// ✅ تصدير قاعدة البيانات حتى تستخدمها في uploadBooks.js
export { db };
