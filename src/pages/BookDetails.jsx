import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import BookImage from "../components/BookImage";
import { useQuery } from "@tanstack/react-query";
import { FiShoppingCart, FiTrash2, FiMessageSquare } from "react-icons/fi";
import { fetchBooks } from "../services/booksService";

export default function BookDetails() {
    const { id } = useParams();
    const { addToCart, removeFromCart, isInCart } = useCart();

    const { data: books = [], isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    if (isLoading)
        return <p className="text-center text-gray-600 py-10">⏳ جاري تحميل التفاصيل...</p>;

    if (error)
        return <p className="text-center text-red-600 py-10">❌ حدث خطأ أثناء تحميل البيانات</p>;

    const book = books.find((b) => String(b.id) === id);

    if (!book) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h2 className="text-xl text-gray-600">❌ الكتاب غير موجود</h2>
                <Link
                    to="/category"
                    className="mt-4 inline-block px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                >
                    العودة للتسوق
                </Link>
            </div>
        );
    }

    // ✅ إصلاح عرض الصور: تحويل كائن الصور إلى مصفوفة إن لزم
    const imageArray = Array.isArray(book.images)
        ? book.images
        : Object.values(book.images || {});

    const isSold = book.status === "sold";
    const inCart = isInCart(book.id);

    const whatsappUrl = `https://wa.me/201034345458?text=${encodeURIComponent(
        `مرحبًا، أود حجز الكتاب التالي:\n\n📖 العنوان: ${book.title}\n💵 السعر: ${book.price}\n🆔 الكود: ${book.id}`
    )}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6 py-12 font-sans"
        >
            <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* 🖼️ قسم الصورة */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-6"
                >
                    <div className="w-full max-w-sm mx-auto drop-shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        <BookImage
                            images={imageArray} // ✅ تمرير مصفوفة صور صحيحة
                            alt={book.title}
                            ratio="aspect-[3/4]"
                            fit="contain"
                            className="rounded-xl"
                        />
                    </div>

                    {book.isNew && (
                        <span className="absolute top-5 right-5 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                            جديد
                        </span>
                    )}
                </motion.div>

                {/* 📖 تفاصيل الكتاب */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 text-right flex flex-col justify-center space-y-5"
                >
                    <h1 className="text-3xl font-bold text-blue-900 leading-snug">
                        {book.title}
                    </h1>

                    {book.author && (
                        <p className="text-gray-600 text-lg">
                            ✍️ <span className="font-medium">المؤلف:</span> {book.author}
                        </p>
                    )}

                    {book.price && (
                        <p className="text-green-700 text-xl font-semibold">
                            💵 السعر: {book.price}
                        </p>
                    )}

                    {book.HPaper && (
                        <p className="text-gray-600 text-base">
                            📄 عدد الصفحات: {book.HPaper}
                        </p>
                    )}

                    {book.description && (
                        <p className="text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                            {book.description}
                        </p>
                    )}

                    {/* 🟢 شارة الحالة */}
                    <div>
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-medium shadow ${
                                isSold
                                    ? "bg-gray-600 text-white"
                                    : "bg-green-600 text-white"
                            }`}
                        >
                            {isSold ? "❌ تم الحجز" : "✅ متوفر"}
                        </span>
                    </div>

                    {/* 🛒 أزرار التفاعل */}
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        {!isSold && (
                            <button
                                onClick={() =>
                                    inCart ? removeFromCart(book.id) : addToCart(book)
                                }
                                className={`flex items-center justify-center gap-2 flex-1 text-base font-medium rounded-lg py-3 transition-all duration-300 ${
                                    inCart
                                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                                        : "bg-blue-700 text-white hover:bg-blue-800"
                                }`}
                            >
                                {inCart ? (
                                    <>
                                        <FiTrash2 /> إزالة من السلة
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart /> أضف إلى السلة
                                    </>
                                )}
                            </button>
                        )}

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 bg-green-600 hover:bg-green-700 text-white text-base font-medium py-3 rounded-lg shadow transition"
                        >
                            <FiMessageSquare /> حجز عبر واتساب
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
