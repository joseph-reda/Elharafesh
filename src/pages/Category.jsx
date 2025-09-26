// src/pages/Category.jsx
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import books from "../data/books.json";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import { motion } from "framer-motion";

// التصنيفات الرئيسية فقط
const categories = ["روائي", "غير روائي", "مترجم", "عربي"];

export default function Category() {
    const { name } = useParams();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // ترتيب الكتب (الأحدث أولاً)
    const sortedBooks = [...books].sort((a, b) => b.id - a.id);

    // فلترة الكتب
    const filteredBooks = name
        ? sortedBooks.filter((book) => {
            if (name === "مترجم" || name === "عربي") {
                return book.type?.toLowerCase() === name.toLowerCase();
            }
            if (name === "غير روائي") {
                return book.category?.toLowerCase() !== "روائي";
            }
            return book.category?.toLowerCase() === name.toLowerCase();
        })
        : sortedBooks;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-right font-sans space-y-10">
            {/* عنوان الصفحة */}
            <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-blue-800"
            >
                📚 التصنيفات
            </motion.h1>

            {/* فلتر التصنيفات */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 justify-end"
            >
                <Link to="/category">
                    <CategoryCard title="الكل" />
                </Link>

                {categories.map((category) => (
                    <Link key={category} to={`/category/${category}`}>
                        <CategoryCard title={category} />
                    </Link>
                ))}
            </motion.div>

            {/* العنوان الفرعي */}
            <motion.h2
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-semibold text-blue-700 border-r-4 border-blue-600 pr-3"
            >
                📖 {name ? `تصنيف: ${name}` : "جميع الكتب"}
            </motion.h2>

            {/* قائمة الكتب */}
            {filteredBooks.length === 0 ? (
                <p className="text-gray-600 text-lg">
                    لا توجد كتب ضمن هذا التصنيف حالياً.
                </p>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredBooks.map((book) => (
                        <motion.div
                            key={book.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="relative"
                        >
                            <BookCard book={book} />

                            {/* زر المفضلة */}
                            <button
                                onClick={() =>
                                    isFavorite(book.id)
                                        ? removeFavorite(book.id)
                                        : addFavorite(book)
                                }
                                className={`mt-3 w-full text-sm px-4 py-2 rounded-lg transition font-medium ${isFavorite(book.id)
                                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {isFavorite(book.id)
                                    ? "❤️ إزالة من المفضلة"
                                    : "🤍 أضف إلى المفضلة"}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
