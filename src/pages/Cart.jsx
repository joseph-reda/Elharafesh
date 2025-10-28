import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [showButton, setShowButton] = useState(false);

    const totalPrice = cart.reduce((sum, book) => {
        const price = parseFloat(book.price) || 0;
        return sum + price * book.quantity;
    }, 0);

    // 🟢 رسالة واتساب للمجموعة كلها
    const whatsappMessage = [
        "📚 *تفاصيل الكتب المطلوبة:*",
        "──────────────────────────────",
        ...cart.map((book) => {
            let message = `#${book.id} - ${book.title}\n💵 ${book.price}`;
            if (book.quantity > 1) message += ` × ${book.quantity}`;
            return message + "\n──────────────────────────────";
        }),
        `💰 *الإجمالي:* ${totalPrice.toFixed(2)} ج.م`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/2001034345458?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    useEffect(() => {
        setShowButton(cart.length > 0);
    }, [cart]);

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 font-sans text-right relative">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800 mb-10 text-center"
            >
                🛒 سلة التسوق
            </motion.h1>

            {cart.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 text-lg text-center py-16"
                >
                    📭 السلة فارغة حالياً.
                </motion.p>
            ) : (
                <div className="space-y-12">
                    {/* 🧾 بطاقات الكتب */}
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {cart.map((book) => {
                            const singleMessage = [
                                "📖 *الكتاب المطلوب:*",
                                "──────────────────────────────",
                                `#${book.id} - ${book.title}`,
                                `💵 ${book.price}${book.quantity > 1 ? ` × ${book.quantity}` : ""}`,
                                "──────────────────────────────",
                            ].join("\n");

                            const singleBookUrl = `https://wa.me/2001034345458?text=${encodeURIComponent(
                                singleMessage
                            )}`;

                            return (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 flex flex-col"
                                >
                                    {/* صورة الكتاب */}
                                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-50">
                                        <img
                                            src={book.images?.[0] || "/placeholder.png"}
                                            alt={book.title}
                                            className="w-full h-[420px] object-contain transition-transform duration-500 hover:scale-105"
                                        />
                                        {book.isNew && (
                                            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                                                جديد
                                            </span>
                                        )}
                                    </div>

                                    {/* تفاصيل الكتاب */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-semibold text-blue-900 line-clamp-2">
                                                {book.title}
                                            </h2>
                                            <p className="text-green-700 font-semibold text-lg">
                                                💵 {book.price}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                🆔 رقم الكتاب: {book.id}
                                            </p>
                                        </div>

                                        {/* التحكم بالكمية */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <label className="text-gray-700 text-sm">
                                                الكمية:
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={book.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(
                                                        book.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="w-16 border border-gray-300 rounded-md p-1 text-center shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                                            />
                                        </div>

                                        {/* الأزرار */}
                                        <div className="flex justify-between items-center gap-3 pt-4">
                                            <a
                                                href={singleBookUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg shadow transition text-center"
                                            >
                                                📲 حجز الكتاب
                                            </a>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(book.id)
                                                }
                                                className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg shadow transition"
                                            >
                                                🗑️ إزالة
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 💰 ملخص السلة */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-l from-blue-50 to-white border-t-4 border-blue-600 rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <p className="text-2xl font-bold text-blue-800">
                            💰 الإجمالي: {totalPrice.toFixed(2)} ج.م
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={clearCart}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition"
                            >
                                🧹 إفراغ السلة
                            </button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
                            >
                                📦 حجز المجموعة كاملة
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* 🔘 زر واتساب عائم */}
            {showButton && (
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all"
                    title="حجز عبر واتساب"
                >
                    <FaWhatsapp />
                </motion.a>
            )}
        </main>
    );
}
