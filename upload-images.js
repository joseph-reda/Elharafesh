import fs from "fs";
import path from "path";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import admin from "firebase-admin";

// 🔑 ملف مفتاح الخدمة من Firebase
import serviceAccount from "./firebase-service-key.json" assert { type: "json" };

// تهيئة Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "YOUR_PROJECT_ID.appspot.com", // ضع هنا مشروعك
});

const bucket = admin.storage().bucket();

const inputDir = path.resolve("public/images");
const tempDir = path.resolve("public/images/temp");

// إنشاء مجلد مؤقت للصور المضغوطة
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

(async () => {
    try {
        const files = fs
            .readdirSync(inputDir)
            .filter((f) => /\.(jpe?g|png)$/i.test(f));

        for (const file of files) {
            const filePath = path.join(inputDir, file);
            const tempPath = path.join(tempDir, file);

            console.log(`🔄 ضغط الصورة: ${file} ...`);

            // ضغط الصورة
            await imagemin([filePath], {
                destination: tempDir,
                plugins: [
                    imageminMozjpeg({ quality: 75 }),
                    imageminPngquant({ quality: [0.6, 0.8] }),
                    imageminWebp({ quality: 75 }),
                ],
            });

            console.log(`🚀 رفع الصورة إلى Firebase: ${file} ...`);

            // رفع الصورة إلى Firebase
            await bucket.upload(tempPath, {
                destination: `images/${file}`, // المسار داخل Firebase
                metadata: { cacheControl: "public,max-age=31536000" },
            });

            console.log(`✅ تم رفع الصورة: ${file}`);
        }

        console.log("🎉 تم ضغط ورفع جميع الصور بنجاح!");
    } catch (err) {
        console.error("❌ خطأ أثناء الضغط أو الرفع:", err);
        process.exit(1);
    }
})();
