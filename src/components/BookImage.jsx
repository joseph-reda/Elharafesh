import { useState, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, AnimatePresence } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

/**
 * 📘 مكون BookImage:
 * يعرض صور الكتاب مع إمكانية التنقل بينها وتأثيرات انتقال جميلة.
 */
export default function BookImage({
    images = [],
    alt = "غلاف الكتاب",
    className = "",
    fit = "contain",
    ratio = "aspect-[3/4]",
}) {
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // ✅ تحويل الصور إلى Array في حال كانت Object من Firebase
    const imageArray = useMemo(() => {
        if (!images) return [];
        return Array.isArray(images) ? images : Object.values(images);
    }, [images]);

    // 🖼️ في حال لا توجد صور
    if (imageArray.length === 0) {
        return (
            <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 ${ratio} flex items-center justify-center`}
            >
                <img
                    src="/placeholder.png"
                    alt={alt}
                    className="w-2/3 h-auto object-contain opacity-70"
                    loading="lazy"
                />
            </div>
        );
    }

    // 🧩 الصورة الحالية
    const currentImage = imageArray[index];
    const webpSrc = currentImage?.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    // 🔁 التنقل بين الصور
    const nextImage = () => {
        setLoaded(false);
        setIndex((prev) => (prev + 1) % imageArray.length);
    };

    const prevImage = () => {
        setLoaded(false);
        setIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md hover:shadow-xl transition-all duration-500 ${ratio} ${className}`}
        >
            {/* 💫 تأثير تحميل مؤقت */}
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
            )}

            {/* 🎬 الصورة الحالية مع حركة انتقال */}
            <AnimatePresence mode="wait">
                <motion.picture
                    key={index}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <source srcSet={webpSrc} type="image/webp" />
                    <LazyLoadImage
                        src={currentImage}
                        alt={alt}
                        effect="blur"
                        afterLoad={() => setLoaded(true)}
                        className={`max-w-full max-h-full object-${fit} rounded-2xl mx-auto`}
                    />
                </motion.picture>
            </AnimatePresence>

            {/* 🔄 أزرار التنقل بين الصور */}
            {imageArray.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 text-gray-800 p-2 rounded-full shadow hover:bg-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                        aria-label="الصورة السابقة"
                    >
                        ◀
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 text-gray-800 p-2 rounded-full shadow hover:bg-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                        aria-label="الصورة التالية"
                    >
                        ▶
                    </button>

                    {/* 🌟 مؤشرات أسفل الصورة */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {imageArray.map((_, i) => (
                            <span
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    i === index
                                        ? "bg-blue-600 scale-125 shadow-md"
                                        : "bg-gray-400/50 hover:bg-blue-400/70"
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ✨ تدرج خفيف أسفل الصورة */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>
    );
}
