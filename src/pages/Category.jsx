// ✅ src/pages/Category.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import ScrollTopButton from "../components/ScrollTopButton";
import { fetchBooks } from "../services/booksService"; // ✅ جلب البيانات من Firebase

const categories = ["رواية", "غير روائي", "مترجم", "عربي"];

export default function Category() {
    const { name } = useParams();

    // ✅ جلب الكتب من Firebase
    const { data: books = [], isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    // ❌ التعامل مع الخطأ
    if (error) {
        return (
            <p className="text-center text-red-600 py-10">
                ❌ حدث خطأ أثناء تحميل البيانات
            </p>
        );
    }

    // 🔹 ترتيب الكتب: المتاحة أولًا، ثم المباعة، ثم الأحدث
    const sortBooks = (books) => {
        return [...books].sort((a, b) => {
            if (a.status === "available" && b.status === "sold") return -1;
            if (a.status === "sold" && b.status === "available") return 1;
            return b.id - a.id;
        });
    };

    // 🔹 فلترة الكتب حسب التصنيف
    const filterBooks = (books, categoryName) => {
        if (!categoryName) return books;

        const n = categoryName.toLowerCase();
        return books.filter((book) => {
            const cat = book.category?.toLowerCase() || "";
            const type = book.type?.toLowerCase() || "";

            if (n === "مترجم") return ["أجنبي", "عالمي", "مترجم"].includes(type);
            if (n === "عربي") return type.includes("عربي");
            if (n === "غير روائي") return !cat.includes("رواية");
            return cat.includes(n);
        });
    };

    const sortedBooks = sortBooks(books);
    const filteredBooks = filterBooks(sortedBooks, name);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-right font-sans space-y-10">
            {/* 🏷️ عنوان الصفحة */}
            <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-blue-800 mb-2"
            >
                🛍️ التصنيفات
            </motion.h1>

            {/* 🧭 قائمة التصنيفات */}
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

            {/* 📚 عنوان القسم */}
            <motion.h2
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-semibold text-blue-700 border-r-4 border-blue-600 pr-3"
            >
                📖 {name ? `تصنيف: ${name}` : "جميع الكتب"}
            </motion.h2>

            {/* ⏳ حالة التحميل / عرض الكتب */}
            {isLoading ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-200 animate-pulse rounded-lg shadow-sm"
                        ></div>
                    ))}
                </div>
            ) : filteredBooks.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-10">
                    📭 لا توجد كتب ضمن هذا التصنيف حاليًا.
                </p>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
                        >
                            <BookCard book={book} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* 🔝 زر الرجوع للأعلى */}
            <ScrollTopButton />
        </div>
    );
}
