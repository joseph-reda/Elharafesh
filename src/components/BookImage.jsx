// src/components/BookImage.jsx
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function BookImage({
    images = [],
    alt = "غلاف الكتاب",
    className = "",
    fit = "cover", // cover | contain
    ratio = "h-72", // h-72 أو aspect-[3/4]
}) {
    const [loaded, setLoaded] = useState(false);

    // لو مفيش صور نهائي
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

    // أول صورة رئيسية
    const mainImage = images[0];

    // نسخ WebP + أصلية
    const webpSrc = mainImage.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const originalSrc = mainImage;

    return (
        <div
            className={`relative overflow-hidden rounded-md bg-gray-100 ${ratio} ${className}`}
        >
            {/* Skeleton قبل تحميل الصورة */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}

            <picture>
                <source srcSet={webpSrc} type="image/webp" />
                <LazyLoadImage
                    src={originalSrc}
                    alt={alt}
                    effect="blur"
                    afterLoad={() => setLoaded(true)}
                    className={`w-full h-full object-${fit} transition-opacity duration-500 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                />
            </picture>
        </div>
    );
}
