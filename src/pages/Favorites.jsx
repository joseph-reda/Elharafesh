// src/pages/Favorites.jsx
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoriteContext";
import BookCard from "../components/BookCard";

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();
    const favoriteBooks = favorites; // الكتب موجودة بالفعل من الكونتكست

    return (
        <main className="px-4 md:px-12 py-8 text-right font-sans">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800 mb-6"
            >
                ❤️ كتبي المفضلة
            </motion.h1>

            {favoriteBooks.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {favoriteBooks.map((book) => (
                        <motion.div
                            key={book.id}   // ✅ حل المشكلة
                            variants={{
                                hidden: { opacity: 1, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <BookCard book={book} />

                            {/* زر إزالة من المفضلة */}
                            <button
                                onClick={() => removeFavorite(book.id)}
                                className="mt-3 w-full text-sm px-4 py-2 rounded-lg transition font-medium bg-red-100 text-red-600 hover:bg-red-200"
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
                    className="text-gray-600 text-lg text-center py-10"
                >
                    📭 لم تقم بإضافة أي كتاب إلى المفضلة حتى الآن.
                    
                </motion.p>
            )}
        </main>
    );
}
