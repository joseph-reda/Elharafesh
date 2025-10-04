// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce((sum, book) => {
        const price = parseFloat(book.price) || 0;
        return sum + price * book.quantity;
    }, 0);

    return (
        <main className="max-w-7xl mx-auto px-4 py-10 text-right font-sans">
            {/* العنوان */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800 mb-8"
            >
                🛒 سلة التسوق
            </motion.h1>

            {cart.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-20">
                    📭 السلة فارغة حالياً.
                </p>
            ) : (
                <>
                    {/* شبكة الكتب */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cart.map((book) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col"
                            >
                                {/* صورة */}
                                <img
                                    src={book.images?.[0] || "/placeholder.png"}
                                    alt={book.title}
                                    className="w-full h-56 sm:h-64 object-cover"
                                />

                                {/* تفاصيل */}
                                <div className="flex-1 p-4 space-y-2">
                                    <h2 className="text-lg font-bold text-blue-800 line-clamp-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        ✍️ {book.author}
                                    </p>
                                    <p className="text-green-700 font-semibold">
                                        💵 {book.price}
                                    </p>

                                    {/* الكمية */}
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
                                            className="w-16 border rounded p-1 text-center focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* زر الحذف */}
                                <div className="p-4 border-t">
                                    <button
                                        onClick={() => removeFromCart(book.id)}
                                        className="w-full text-sm bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
                                    >
                                        🗑️ إزالة من السلة
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* الشريط السفلي للإجمالي */}
                    <div className="sticky bottom-0 mt-10 bg-white border-t shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xl font-bold text-blue-800">
                            الإجمالي: {totalPrice.toFixed(2)} ج.م
                        </p>
                        <button
                            onClick={clearCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition"
                        >
                            🧹 إفراغ السلة
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}
