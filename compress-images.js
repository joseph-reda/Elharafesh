// compress-images.js
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const inputRoot = path.resolve("public/images");

// دالة recursive تجيب كل الصور من جميع الفولدرات
function getAllImageFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            getAllImageFiles(filePath, fileList);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

(async () => {
    try {
        const allImages = getAllImageFiles(inputRoot);

        for (const file of allImages) {
            const folderPath = path.dirname(file);
            const fileName = path.basename(file);

            // ضغط الصورة الأصلية واستبدالها
            await imagemin([file], {
                destination: folderPath,
                plugins: [
                    imageminMozjpeg({ quality: 75 }),
                    imageminPngquant({ quality: [0.6, 0.8] }),
                ],
            });

            // إنشاء نسخة WebP بنفس الاسم
            await imagemin([file], {
                destination: folderPath,
                plugins: [imageminWebp({ quality: 75 })],
            });

            console.log(`✅ Compressed & created WebP: ${fileName}`);
        }

        console.log("🎉 All images compressed & WebP versions created successfully!");
    } catch (err) {
        console.error("❌ Error compressing images:", err);
    }
})();
