// src/pages/BookDetails.jsx
import { useParams } from "react-router-dom";
import books from "../data/books.json";
import BookImage from "../components/BookImage";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function BookDetails() {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return (
            <p className="text-center mt-20 text-red-600 text-xl font-semibold">
                ❌ الكتاب غير موجود
            </p>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 text-right font-sans space-y-10 bg-gray-50 min-h-screen">
            {/* العنوان */}
            <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-blue-800 border-r-4 border-blue-600 pr-4"
            >
                {book.title}
            </motion.h1>

            {/* الصور + التفاصيل */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg"
            >
                {/* الصور (سلايدر) */}
                <div className="md:w-96 w-full">
                    {book.images?.length > 1 ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={20}
                            className="rounded-lg shadow-md"
                        >
                            {book.images.map((src, index) => (
                                <SwiperSlide key={index}>
                                    <BookImage
                                        images={[src]}
                                        alt={`${book.title} - صورة ${index + 1}`}
                                        fit="cover"
                                        ratio="h-96"
                                        className="rounded-lg border border-blue-100"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <BookImage
                            images={[book.images?.[0] || book.cover]}
                            alt={book.title}
                            fit="cover"
                            ratio="h-96"
                            className="rounded-lg border border-blue-100 shadow-md"
                        />
                    )}
                </div>

                {/* تفاصيل الكتاب */}
                <div className="flex-1 space-y-4 text-gray-800">
                    {book.author && (
                        <p className="text-lg">
                            <span className="font-semibold text-blue-700">✍️ المؤلف: </span>
                            {book.author}
                        </p>
                    )}
                    {book.category && (
                        <p className="text-lg">
                            <span className="font-semibold text-blue-700">📚 القسم: </span>
                            {book.category}
                        </p>
                    )}
                    {book.type && (
                        <p className="text-lg">
                            <span className="font-semibold text-blue-700">📝 النوع: </span>
                            {book.type}
                        </p>
                    )}
                    {book.price && (
                        <p className="text-lg">
                            <span className="font-semibold text-blue-700">💵 السعر: </span>
                            {book.price}
                        </p>
                    )}
                    {book.HPaper && (
                        <p className="text-lg">
                            <span className="font-semibold text-blue-700">
                                📖 عدد الصفحات:{" "}
                            </span>
                            {book.HPaper}
                        </p>
                    )}
                </div>
            </motion.section>

            {/* الملخص */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-r-4 border-blue-600 p-6 rounded-xl shadow-md text-gray-800"
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-700">📖 الملخص</h2>
                <p className="leading-relaxed text-gray-700">
                    {book.description || "لا يوجد ملخص متاح."}
                </p>
            </motion.section>

            {/* زر الحجز أو التواصل */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-end"
            >
                {book.facebookPost ? (
                    <a
                        href={book.facebookPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg shadow-md transition font-medium text-lg"
                    >
                        🛒 احجز عبر فيسبوك
                    </a>
                ) : (
                    <a
                        href="https://wa.me/201212145165"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg shadow-md transition font-medium text-lg"
                    >
                        💬 تواصل عبر واتساب
                    </a>
                )}
            </motion.div>
        </main>
    );
}
