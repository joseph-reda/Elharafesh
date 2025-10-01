// src/pages/Favorites.jsx
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoriteContext";
import BookCard from "../components/BookCard";

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <main className="px-4 md:px-12 py-10 text-right font-sans min-h-screen bg-gray-50">
            {/* العنوان */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-10 border-r-4 border-blue-600 pr-3"
            >
                ❤️ كتبي المفضلة
            </motion.h1>

            {favorites.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {favorites.map((book) => (
                        <motion.div
                            key={book.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 },
                            }}
                            className="flex flex-col"
                        >
                            <BookCard book={book} />

                            <button
                                onClick={() => removeFavorite(book.id)}
                                className="mt-3 w-full text-sm px-4 py-2 rounded-lg font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                            >
                                ❌ إزالة من المفضلة
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-gray-600 text-lg md:text-xl text-center py-16 bg-white rounded-xl shadow-sm"
                >
                    📭 لم تقم بإضافة أي كتاب إلى المفضلة حتى الآن.
                </motion.p>
            )}
        </main>
    );
}
