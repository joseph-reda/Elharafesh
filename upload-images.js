// upload-images.js
import fs from "fs";
import path from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// مسار ملف خدمة Firebase
const serviceKeyPath = "./firebase-service-key.json";

// التحقق من وجود الملف
if (!fs.existsSync(serviceKeyPath)) {
    console.warn(
        "⚠️ ملف firebase-service-key.json غير موجود، سيتم تخطي رفع الصور."
    );
    process.exit(0); // إنهاء السكربت بأمان
}

// تهيئة Firebase
const serviceAccount = JSON.parse(fs.readFileSync(serviceKeyPath, "utf8"));

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "<YOUR_BUCKET_NAME>.appspot.com", // ضع اسم الـ bucket الخاص بك
});

const bucket = getStorage().bucket();

// مسار الصور المضغوطة
const imagesDir = path.resolve("./public/images/compressed");

// رفع كل الصور داخل كل فولدر
fs.readdirSync(imagesDir).forEach((folder) => {
    const folderPath = path.join(imagesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach(async (file) => {
            const filePath = path.join(folderPath, file);
            const destPath = `images/${folder}/${file}`;

            try {
                await bucket.upload(filePath, { destination: destPath });
                console.log(`✅ تم رفع: ${destPath}`);
            } catch (err) {
                console.error(`❌ خطأ أثناء رفع ${destPath}:`, err);
            }
        });
    }
});
