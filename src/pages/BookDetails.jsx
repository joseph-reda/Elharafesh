// src/pages/BookDetails.jsx
import { useParams } from "react-router-dom";
import books from "../data/books.json";
import BookImage from "../components/BookImage";
import { motion } from "framer-motion";

export default function BookDetails() {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return (
            <p className="text-center mt-8 text-red-600 text-lg">
                ❌ الكتاب غير موجود.
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 text-right font-sans space-y-8 bg-blue-50 min-h-screen">
            {/* العنوان */}
            <motion.h1
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-blue-800 border-r-4 border-blue-600 pr-4"
            >
                {book.title}
            </motion.h1>

            {/* الصور + التفاصيل */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row items-start gap-8 bg-white p-6 rounded-xl shadow-md"
            >
                {/* عرض أكثر من صورة */}
                <div className="flex flex-col gap-4 md:w-72">
                    {book.images?.length > 0 ? (
                        book.images.map((src, index) => (
                            <BookImage
                                key={index}
                                src={src}
                                alt={`${book.title} - صورة ${index + 1}`}
                                fit="cover"
                                ratio="h-80"
                                className="rounded-lg border border-blue-200"
                            />
                        ))
                    ) : (
                        <BookImage
                            src={book.cover}
                            alt={book.title}
                            fit="cover"
                            ratio="h-80"
                            className="rounded-lg border border-blue-200"
                        />
                    )}
                </div>

                {/* معلومات الكتاب */}
                <div className="space-y-3 flex-1 text-gray-800">
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
                            <span className="font-semibold text-blue-700">📖 عدد الصفحات: </span>
                            {book.HPaper}
                        </p>
                    )}
                </div>
            </motion.div>

            {/* الملخص */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border-r-4 border-blue-600 p-6 rounded-xl shadow-md text-gray-800"
            >
                <h2 className="text-2xl font-bold mb-3 text-blue-700">📖 الملخص</h2>
                <p className="leading-relaxed">{book.description || "لا يوجد ملخص متاح."}</p>
            </motion.div>

            {/* زر الحجز أو التواصل */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-end"
            >
                {book.facebookPost ? (
                    <a
                        href={book.facebookPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition font-medium text-lg"
                    >
                        🛒 احجز عبر فيسبوك
                    </a>
                ) : (
                    <a
                        href="https://wa.me/201212145165"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition font-medium text-lg"
                    >
                        💬 تواصل عبر واتساب
                    </a>
                )}
            </motion.div>
        </div>
    );
}
