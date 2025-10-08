// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce((sum, book) => {
        const price = parseFloat(book.price) || 0;
        return sum + price * book.quantity;
    }, 0);

    // ✅ رابط حجز كل الكتب
    const whatsappMessage = cart
        .map((book) => `📚 ${book.title} - ${book.price} × ${book.quantity}`)
        .join("\n");

    const whatsappUrl = `https://wa.me/2001034345458?text=مرحبًا، أود حجز هذه الكتب:\n${encodeURIComponent(
        whatsappMessage
    )}\n\nالإجمالي: ${totalPrice.toFixed(2)} ج.م`;

    return (
        <main className="max-w-7xl mx-auto px-4 py-10 text-right font-sans">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800 mb-8 text-center"
            >
                🛒 سلة التسوق
            </motion.h1>

            {cart.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-10">
                    📭 السلة فارغة حالياً.
                </p>
            ) : (
                <div className="space-y-8">
                    {/* شبكة الكتب */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cart.map((book) => {
                            const singleBookUrl = `https://wa.me/2001034345458?text=مرحبًا، أود حجز الكتاب:\n📖 ${book.title}\n💵 ${book.price}`;
                            return (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col"
                                >
                                    <img
                                        src={book.images?.[0] || "/placeholder.png"}
                                        alt={book.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
                                        <div>
                                            <h2 className="text-lg font-semibold text-blue-800 mb-1">
                                                {book.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm">✍️ {book.author}</p>
                                            <p className="text-green-700 font-semibold mt-1">
                                                💵 {book.price}
                                            </p>
                                        </div>

                                        {/* التحكم في الكمية */}
                                        <div className="flex items-center gap-2">
                                            <label className="text-gray-700 text-sm">الكمية:</label>
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
                                                className="w-16 border rounded p-1 text-center"
                                            />
                                        </div>

                                        {/* الأزرار */}
                                        <div className="flex justify-between items-center gap-2 pt-2">
                                            <a
                                                href={singleBookUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded shadow text-center"
                                            >
                                                📲 حجز الكتاب
                                            </a>
                                            <button
                                                onClick={() => removeFromCart(book.id)}
                                                className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded shadow"
                                            >
                                                🗑️ إزالة
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ✅ ملخص السلة */}
                    <div className="bg-gray-50 border-t-4 border-blue-600 rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-2xl font-bold text-blue-800">
                            💰 الإجمالي: {totalPrice.toFixed(2)} ج.م
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={clearCart}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
                            >
                                🧹 إفراغ السلة
                            </button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
                            >
                                📦 حجز المجموعة كاملة
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
