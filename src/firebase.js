// src/firebase.js

// 🔹 استيراد الدوال المطلوبة من Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // ✅ لإدارة الصور لاحقًا

// 🔹 إعدادات Firebase الخاصة بمشروعك
const firebaseConfig = {
    apiKey: "AIzaSyDosJvnIDu9Ronovg5zcHs3Xq7UkFYTrDs",
    authDomain: "elharafesh-b8066.firebaseapp.com",
    databaseURL: "https://elharafesh-b8066-default-rtdb.firebaseio.com",
    projectId: "elharafesh-b8066",
    storageBucket: "elharafesh-b8066.appspot.com", // ✅ تم تصحيح النطاق
    messagingSenderId: "250437766537",
    appId: "1:250437766537:web:bd513de6004f0020902558",
    measurementId: "G-2WFM4T8MHK",
};

// 🔹 تهيئة تطبيق Firebase
const app = initializeApp(firebaseConfig);

// 🔹 الاتصال بقاعدة البيانات والتخزين
const db = getDatabase(app);
const storage = getStorage(app);

// ✅ تصديرهم لاستخدامهم في جميع الملفات
export { db, storage };
