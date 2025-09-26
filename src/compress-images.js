import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const inputDir = path.resolve("public/images");
const outputDir = path.resolve("public/images/compressed");

// إنشاء مجلد الإخراج إذا لم يكن موجود
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
    try {
        const files = fs
            .readdirSync(inputDir)
            .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

        for (const file of files) {
            const inputFile = path.join(inputDir, file);
            await imagemin([inputFile], {
                destination: outputDir,
                plugins: [
                    imageminMozjpeg({ quality: 75 }),
                    imageminPngquant({ quality: [0.6, 0.8] }),
                    imageminWebp({ quality: 75 }),
                ],
            });
            console.log(`Compressed: ${file}`);
        }
        console.log("All images compressed successfully!");
    } catch (err) {
        console.error(err);
    }
})();
