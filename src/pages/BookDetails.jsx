// src/pages/BookDetails.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import BookImage from "../components/BookImage";
import { useQuery } from "@tanstack/react-query";

export default function BookDetails() {
    const { id } = useParams();
    const { addToCart, removeFromCart, isInCart } = useCart();

    // ✅ جلب الكتب من API أو JSON
    const { data: books = [], isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: () => fetch("/books.json").then((res) => res.json()),
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

    // ✅ الحالات
    const isSold = book.status === "sold";
    const notAvailable = isSold;

    // ✅ رابط واتساب للحجز
    const whatsappUrl = `https://wa.me/201234567890?text=مرحبًا، أود حجز الكتاب:\n📖 ${book.title}\n💵 ${book.price}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg"
        >
            {/* صورة الكتاب */}
            <div>
                <BookImage
                    images={book.images || []}
                    alt={book.title}
                    ratio="h-96"
                    fit="contain"
                    className="rounded-lg"
                />
            </div>

            {/* تفاصيل الكتاب */}
            <div className="space-y-5 text-right">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {book.title}
                </h1>

                {book.author && (
                    <p className="text-gray-600 text-lg">
                        ✍️ <span className="font-medium">المؤلف:</span> {book.author}
                    </p>
                )}

                {book.price && (
                    <p className="text-green-700 font-semibold text-lg">
                        💵 السعر: {book.price}
                    </p>
                )}

                {book.HPaper && (
                    <p className="text-gray-600">📄 عدد الصفحات: {book.HPaper}</p>
                )}

                {book.description && (
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                )}

                {/* شارة الحالة */}
                <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow ${isSold ? "bg-gray-700 text-white" : "bg-green-600 text-white"
                        }`}
                >
                    {isSold ? "❌ تم البيع" : "✅ متوفر"}
                </p>

                {/* أزرار التفاعل */}
                <div className="pt-4 flex flex-col gap-3">
                    {notAvailable ? (
                        <p className="text-red-600 font-semibold">
                            ⚠️ هذا الكتاب غير متاح حالياً
                        </p>
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    isInCart(book.id) ? removeFromCart(book.id) : addToCart(book)
                                }
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${isInCart(book.id)
                                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                                        : "bg-blue-700 text-white hover:bg-blue-800"
                                    }`}
                            >
                                {isInCart(book.id) ? "🗑️ إزالة من السلة" : "➕ أضف إلى السلة"}
                            </button>

                            {/* ✅ زر الحجز عبر واتساب */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow transition"
                            >
                                📲 حجز عبر واتساب
                            </a>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
