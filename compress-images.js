import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const inputDir = path.resolve("public/images");
const outputDir = path.resolve("public/images/compressed");

// إنشاء مجلد الإخراج لو مش موجود
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
    try {
        // قراءة كل الفولدرات داخل public/images
        const folders = fs
            .readdirSync(inputDir)
            .filter((f) => fs.statSync(path.join(inputDir, f)).isDirectory());

        for (const folder of folders) {
            const folderPath = path.join(inputDir, folder);
            const outputFolder = path.join(outputDir, folder);

            // إنشاء مجلد الإخراج لكل يوم لو مش موجود
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

            console.log(`✅ تم ضغط الصور وإنشاء نسخة WebP في: ${outputFolder}`);
        }

        console.log("🎉 تم ضغط جميع الصور في كل الفولدرات بنجاح!");
    } catch (err) {
        console.error("❌ خطأ أثناء ضغط الصور:", err);
    }
})();
