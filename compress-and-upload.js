import fs from "fs";
import path from "path";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";

const inputDir = path.resolve("public/images");
const outputDir = path.resolve("public/images/compressed");

(async () => {
    try {
        // إنشاء مجلد الإخراج لو مش موجود
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // ضغط الصور
        const folders = fs
            .readdirSync(inputDir)
            .filter((f) => fs.statSync(path.join(inputDir, f)).isDirectory());

        for (const folder of folders) {
            const folderPath = path.join(inputDir, folder);
            const outputFolder = path.join(outputDir, folder);

            if (!fs.existsSync(outputFolder)) {
                fs.mkdirSync(outputFolder, { recursive: true });
            }

            console.log(`🔄 جاري ضغط صور الفولدر: ${folder} ...`);

            await imagemin([`${folderPath}/*.{jpg,jpeg,png}`], {
                destination: outputFolder,
                plugins: [
                    imageminMozjpeg({ quality: 75 }),
                    imageminPngquant({ quality: [0.6, 0.8] }),
                    imageminWebp({ quality: 75 }),
                ],
            });

            console.log(`✅ تم ضغط الصور في: ${outputFolder}`);
        }

        // ✅ محاولة رفع الصور لو مفتاح Firebase موجود
        const firebaseKeyPath = path.resolve("firebase-service-key.json");
        if (fs.existsSync(firebaseKeyPath)) {
            console.log("🚀 رفع الصور إلى Firebase...");
            const { initializeApp, cert } = await import("firebase-admin/app");
            const { getStorage } = await import("firebase-admin/storage");
            const serviceAccount = JSON.parse(
                fs.readFileSync(firebaseKeyPath, "utf-8")
            );

            const app = initializeApp({
                credential: cert(serviceAccount),
                storageBucket: "<YOUR_FIREBASE_BUCKET>.appspot.com", // ضع هنا bucket الخاص بك
            });

            const bucket = getStorage(app).bucket();

            for (const folder of folders) {
                const folderPath = path.join(outputDir, folder);
                const files = fs.readdirSync(folderPath);

                for (const file of files) {
                    const filePath = path.join(folderPath, file);
                    await bucket.upload(filePath, {
                        destination: `compressed/${folder}/${file}`,
                        gzip: true,
                    });
                }
            }
            console.log("✅ تم رفع جميع الصور بنجاح!");
        } else {
            console.log("⚠️ ملف Firebase غير موجود، تم تخطي رفع الصور.");
        }
    } catch (err) {
        console.error("❌ خطأ أثناء ضغط أو رفع الصور:", err);
    }
})();
