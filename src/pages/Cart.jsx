// src/pages/Cart.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce(
        (sum, book) => sum + (parseFloat(book.price) || 0) * (book.quantity || 1),
        0
    );

    const BASE_URL = window.location.origin;

    // رسالة واتساب احترافية (مفصولة عن الـ map عشان ما يحصلش خطأ)
    const orderLines = cart.map((book, i) => {
        const qty = book.quantity > 1 ? ` × ${book.quantity}` : "";
        return `${i + 1}. ${book.title}
   المؤلف: ${book.author}
   السعر: ${book.price} ج.م${qty}
   الرابط: ${BASE_URL}/book/${book.id}`;
    });

    const whatsappMessage = [
        "مكتبة الحرافيش للكتب المستعملة",
        "شكرًا لاختيارك كتبك من عندنا!",
        "",
        "طلب حجز كتب:",
        "━━━━━━━━━━━━━━━━━━",
        ...orderLines,
        "━━━━━━━━━━━━━━━━━━",
        `الإجمالي: *${totalPrice.toFixed(2)} جنيه مصري*`,
        "",
        "يرجى تأكيد الطلب لتجهيز الكتب فورًا",
        "نشكرك على ثقتك فينا – مكتبة الحرافيش",
    ].join("\n");

    const whatsappUrl = `https://wa.me/201034345458?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // حالة السلة فارغة
    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 flex items-center justify-center"
            >
                <div className="text-center">
                    <div className="text-9xl mb-8">Empty Cart</div>
                    <h2 className="text-4xl font-bold text-gray-700 mb-4">السلة فارغة</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        ابدأ التسوق الآن واختر كتبك المفضلة
                    </p>
                    <Link
                        to="/category"
                        className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition transform hover:scale-105"
                    >
                        تصفح الكتب
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
                    >
                        سلة التسوق
                    </motion.h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* قائمة الكتب */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cart.map((book) => (
                                    <motion.div
                                        key={book.id}
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                                    >
                                        <div className="flex items-center p-6 gap-6">
                                            <Link to={`/book/${book.id}`} className="flex-shrink-0">
                                                <img
                                                    src={book.images?.[0] || "/placeholder.png"}
                                                    alt={book.title}
                                                    className="w-28 h-40 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                                                />
                                            </Link>

                                            <div className="flex-1">
                                                <Link
                                                    to={`/book/${book.id}`}
                                                    className="block font-bold text-xl text-gray-800 hover:text-blue-600 transition mb-2"
                                                >
                                                    {book.title}
                                                </Link>
                                                <p className="text-gray-600 mb-3">المؤلف: {book.author}</p>

                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className="text-lg font-medium text-gray-700">الكمية:</span>
                                                    <div className="flex items-center bg-gray-100 rounded-full">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(book.id, (book.quantity || 1) - 1)
                                                            }
                                                            disabled={(book.quantity || 1) <= 1}
                                                            className="p-2 hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="w-12 text-center font-bold text-lg">
                                                            {book.quantity || 1}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(book.id, (book.quantity || 1) + 1)
                                                            }
                                                            className="p-2 hover:bg-gray-200 rounded-full transition"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-indigo-600">
                                                        {book.price} ج.م
                                                    </span>
                                                    {book.quantity > 1 && (
                                                        <span className="text-lg text-gray-600">
                                                            = {(book.price * book.quantity).toFixed(2)} ج.م
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    removeFromCart(book.id);
                                                    toast.success("تم إزالة الكتاب من السلة", {
                                                        icon: "Trash",
                                                        style: { background: "#fef2f2", color: "#991b1b" },
                                                    });
                                                }}
                                                className="text-red-500 hover:text-red-700 p-3 rounded-full hover:bg-red-50 transition"
                                            >
                                                <FiTrash2 size={24} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* ملخص الطلب */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:sticky lg:top-24 h-fit"
                        >
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6 text-center">ملخص الطلب</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-lg">
                                        <span>عدد الكتب:</span>
                                        <span className="font-bold">{cart.length}</span>
                                    </div>
                                    <div className="flex justify-between text-xl">
                                        <span>الإجمالي:</span>
                                        <span className="font-extrabold text-3xl">
                                            {totalPrice.toFixed(2)} ج.م
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-5 rounded-2xl font-bold text-xl shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-3"
                                    >
                                        <FaWhatsapp size={28} />
                                        إرسال الطلب عبر واتساب
                                    </a>

                                    <button
                                        onClick={clearCart}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold transition"
                                    >
                                        إفراغ السلة
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* زر واتساب عائم */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-5 rounded-full shadow-2xl flex items-center gap-3 text-lg font-bold transition transform hover:scale-110"
                >
                    <FaWhatsapp size={32} />
                    <span className="hidden sm:inline">إرسال الطلب</span>
                </a>
            </div>
        </>
    );
}