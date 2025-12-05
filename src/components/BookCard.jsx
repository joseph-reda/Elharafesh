// src/components/BookCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }) {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const inCart = isInCart(book.id);

    if (!book) return null;

    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            <Link to={`/book/${book.id}`}>
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <LazyLoadImage
                        src={book.images?.[0] || "/placeholder-low.jpg"}
                        alt={book.title}
                        effect="blur"
                        className="w-full h-full object-cover"
                        wrapperClassName="w-full h-full"
                    />
                    {book.status === "sold" && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-white text-3xl font-bold drop-shadow-2xl">
                                تم البيع
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-5">
                <Link to={`/book/${book.id}`} className="block">
                    <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition line-clamp-2 min-h-14">
                        {book.title}
                    </h3>
                </Link>
                <p className="text-gray-600 text-sm mt-1">{book.author}</p>

                <div className="flex items-center justify-between mt-5">
                    <span className="text-2xl font-bold text-indigo-600">
                        {book.price} ج.م
                    </span>

                    <button
                        onClick={() => (inCart ? removeFromCart(book.id) : addToCart(book))}
                        className={`p-3.5 rounded-full transition-all duration-200 ${inCart
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                    >
                        {inCart ? <FiTrash2 size={23} /> : <FiShoppingCart size={23} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}