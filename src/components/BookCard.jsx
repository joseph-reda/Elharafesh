// src/components/BookCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BookImage from "./BookImage";

export default function BookCard({ book }) {
    if (!book) return null;

    const isSold = book.status === "sold";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden text-right border border-gray-100 relative"
        >
            {/* صورة الكتاب + الشارات */}
            <div className="relative">
                <BookImage
                    images={book.images || []}
                    alt={book.title}
                    ratio="h-72"
                    fit="cover"
                    className="rounded-t-2xl"
                />

                {/* شارة جديد */}
                {book.isNew && (
                    <span className="absolute top-3 right-3 text-xs bg-red-600 text-white px-2 py-1 rounded-full shadow-md">
                        جديد
                    </span>
                )}

                {/* شارة الحالة */}
                <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full shadow-md ${
                        isSold ? "bg-gray-700 text-white" : "bg-green-600 text-white"
                    }`}
                >
                    {isSold ? "❌ تم البيع" : "✅ متوفر"}
                </span>
            </div>

            {/* تفاصيل الكتاب */}
            <div className="p-4 space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug line-clamp-2">
                    {book.title}
                </h3>

                {book.author && (
                    <p className="text-gray-600 text-sm">
                        ✍️ <span className="font-medium">المؤلف:</span> {book.author}
                    </p>
                )}

                {book.price && (
                    <p className="text-sm text-green-700 font-semibold">
                        💵 السعر: {book.price}
                    </p>
                )}

                {/* زر التفاصيل */}
                <Link
                    to={`/book/${book.id}`}
                    className={`inline-block text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isSold
                            ? "bg-gray-400 text-white cursor-not-allowed opacity-80"
                            : "bg-blue-700 text-white hover:bg-blue-800"
                    }`}
                    onClick={(e) => {
                        if (isSold) e.preventDefault();
                    }}
                >
                    {isSold ? "غير متاح" : "عرض التفاصيل"}
                </Link>
            </div>
        </motion.div>
    );
}
