import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce((sum, book) => {
        const price = parseFloat(book.price) || 0;
        return sum + price * book.quantity;
    }, 0);

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 text-right font-sans">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800 mb-8"
            >
                🛒 سلة التسوق
            </motion.h1>

            {cart.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-10">
                    📭 السلة فارغة حالياً.
                </p>
            ) : (
                <div className="space-y-6">
                    {cart.map((book) => (
                        <div
                            key={book.id}
                            className="flex flex-col md:flex-row items-start gap-6 bg-white shadow rounded-lg p-4"
                        >
                            <img
                                src={book.images?.[0] || "/placeholder.png"}
                                alt={book.title}
                                className="w-32 h-44 object-cover rounded border"
                            />
                            <div className="flex-1 space-y-2">
                                <h2 className="text-xl font-semibold text-blue-800">
                                    {book.title}
                                </h2>
                                <p className="text-gray-600">
                                    ✍️ {book.author}
                                </p>
                                <p className="text-green-700 font-semibold">
                                    💵 {book.price}
                                </p>

                                <div className="flex items-center gap-2 mt-3">
                                    <label className="text-gray-700">الكمية:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={book.quantity}
                                        onChange={(e) =>
                                            updateQuantity(book.id, parseInt(e.target.value))
                                        }
                                        className="w-16 border rounded p-1 text-center"
                                    />
                                </div>

                                <button
                                    onClick={() => removeFromCart(book.id)}
                                    className="mt-3 text-red-600 hover:text-red-800"
                                >
                                    🗑️ إزالة
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <p className="text-xl font-bold text-blue-800">
                            الإجمالي: {totalPrice.toFixed(2)} ج.م
                        </p>
                        <button
                            onClick={clearCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            إفراغ السلة
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
