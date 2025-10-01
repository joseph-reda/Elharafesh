// src/components/BookImage.jsx
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, AnimatePresence } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function BookImage({
    images = [],
    alt = "غلاف الكتاب",
    className = "",
    fit = "cover", // cover | contain
    ratio = "h-72", // h-72 أو aspect-[3/4]
}) {
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div
                className={`relative overflow-hidden rounded-md bg-gray-200 ${ratio}`}
            >
                <img
                    src="/placeholder.png"
                    alt={alt}
                    className={`w-full h-full object-${fit}`}
                    loading="lazy"
                />
            </div>
        );
    }

    // الصورة الحالية
    const currentImage = images[index];
    const webpSrc = currentImage.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    const nextImage = () => {
        setLoaded(false);
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setLoaded(false);
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className={`relative overflow-hidden rounded-md bg-gray-100 ${ratio} ${className}`}
        >
            {/* Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}

            <AnimatePresence mode="wait">
                <motion.picture
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                >
                    <source srcSet={webpSrc} type="image/webp" />
                    <LazyLoadImage
                        src={currentImage}
                        alt={alt}
                        effect="blur"
                        afterLoad={() => setLoaded(true)}
                        className={`w-full h-full object-${fit} rounded-md`}
                    />
                </motion.picture>
            </AnimatePresence>

            {/* أزرار التنقل لو أكتر من صورة */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                        aria-label="الصورة السابقة"
                    >
                        ◀
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                        aria-label="الصورة التالية"
                    >
                        ▶
                    </button>

                    {/* مؤشرات الصور */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
