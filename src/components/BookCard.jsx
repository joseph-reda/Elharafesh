import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function BookCard({ book }) {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!book) return null;

    const isSold = book.status === "sold";
    const inCart = isInCart(book.id);

    const images = Array.isArray(book.images) ? book.images : book.images ? [book.images] : [];

    const nextImage = () => {
        if (images.length > 1)
            setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (images.length > 1)
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden text-right border border-gray-100 relative"
        >
            {/* 🖼️ صورة الكتاب */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                {images.length > 0 ? (
                    <img
                        src={images[currentIndex]}
                        alt={book.title}
                        className="w-full h-[420px] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-[420px] text-gray-400">
                        لا توجد صورة
                    </div>
                )}

                {/* 🔘 أزرار التنقل بين الصور */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 shadow hover:bg-white"
                        >
                            ◀
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 shadow hover:bg-white"
                        >
                            ▶
                        </button>

                        {/* مؤشر الصور الصغيرة */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${idx === currentIndex
                                        ? "bg-blue-600"
                                        : "bg-white/70"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* 🔘 حالة الكتاب */}
                <span
                    className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full shadow-md ${isSold ? "bg-gray-600" : "bg-green-600"
                        } text-white`}
                >
                    {isSold ? "❌ تم الحجز" : "✅ متوفر"}
                </span>

                {/* طبقة ظل أنيقة عند المرور */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* 📘 تفاصيل الكتاب */}
            <div className="p-5 space-y-3">
                {/* 🏷️ العنوان */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                    {book.title}
                </h3>

                {/* ✍️ المؤلف */}
                {book.author && (
                    <p className="text-gray-500 text-sm line-clamp-1">
                        ✍️ {book.author}
                    </p>
                )}

                {/* 💵 السعر */}
                {book.price && (
                    <p className="text-green-700 text-base font-semibold">
                        💵 {book.price} ج.م
                    </p>
                )}

                {/* 📄 زر التفاصيل */}
                <Link
                    to={`/book/${book.id}`}
                    className={`block w-full text-center text-sm md:text-base px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${isSold
                            ? "bg-gray-400 text-white cursor-not-allowed opacity-80"
                            : "bg-blue-700 hover:bg-blue-800 text-white shadow-sm hover:shadow-md"
                        }`}
                >
                    {isSold ? "غير متاح الآن" : "عرض التفاصيل"}
                </Link>

                {/* 🛒 زر السلة */}
                {!isSold && (
                    <button
                        onClick={() =>
                            inCart ? removeFromCart(book.id) : addToCart(book)
                        }
                        className={`mt-2 w-full flex items-center justify-center gap-2 text-sm md:text-base px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${inCart
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                    >
                        {inCart ? (
                            <>
                                <FiTrash2 className="text-lg" />
                                إزالة من السلة
                            </>
                        ) : (
                            <>
                                <FiShoppingCart className="text-lg" />
                                أضف إلى السلة
                            </>
                        )}
                    </button>
                )}
            </div>
        </motion.div>
    );
}
