// ✅ src/pages/Category.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import ScrollTopButton from "../components/ScrollTopButton";

const categories = ["تاريخ", "رواية", "فلسفة", "مترجم", "عربي"];

export default function Category() {
    const { name } = useParams();
    const [books, setBooks] = useState([]);
    const [visibleBooks, setVisibleBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [showSold, setShowSold] = useState(false); // هل بدأنا بعرض الكتب المباعة
    const PAGE_SIZE = 20;

    // 📦 تحميل كل الكتب مرة واحدة (ثم تقسيمها محليًا)
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                setLoading(true);
                const snapshot = await get(ref(db, "books"));
                if (snapshot.exists()) {
                    const data = Object.values(snapshot.val());

                    // ✅ ترتيب الكتب بالأحدث
                    const sorted = data.sort((a, b) => b.id - a.id);

                    // ✅ فصل الكتب المتاحة والمباعة
                    const available = sorted.filter((b) => b.status === "available");
                    const sold = sorted.filter((b) => b.status === "sold");

                    // ✅ جمعهم بحيث المتاحة أولًا
                    const ordered = [...available, ...sold];
                    setBooks(ordered);

                    // ✅ عرض أول دفعة من الكتب المتاحة فقط
                    setVisibleBooks(ordered.slice(0, PAGE_SIZE));
                } else {
                    setBooks([]);
                }
            } catch (err) {
                console.error("❌ خطأ أثناء جلب الكتب:", err);
                setError("حدث خطأ أثناء تحميل البيانات.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllBooks();
    }, []);

    // 🔽 تحميل المزيد من الكتب (حسب المرحلة)
    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);

        setTimeout(() => {
            const currentCount = visibleBooks.length;
            const nextBatch = books.slice(currentCount, currentCount + PAGE_SIZE);
            setVisibleBooks((prev) => [...prev, ...nextBatch]);

            // ✅ إذا انتهت الكتب المتاحة نبدأ بعرض المباعة
            if (nextBatch.some((b) => b.status === "sold")) {
                setShowSold(true);
            }

            setLoadingMore(false);
        }, 500);
    };

    // 🔍 فلترة حسب التصنيف
    const filteredBooks = name
        ? books.filter((book) => {
            const cat = book.category?.toLowerCase() || "";
            const type = book.type?.toLowerCase() || "";
            const n = name.toLowerCase();

            if (n === "مترجم") return ["أجنبي", "عالمي", "مترجم"].includes(type);
            if (n === "عربي") return type.includes("عربي");
            if (n === "غير روائي") return !cat.includes("رواية");
            return cat.includes(n);
        })
        : books;

    // ✅ عرض فقط الدفعات الحالية بعد الفلترة
    const displayedBooks = name
        ? filteredBooks.slice(0, visibleBooks.length)
        : visibleBooks;

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
            {loading ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(PAGE_SIZE)].map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-200 animate-pulse rounded-lg shadow-sm"
                        ></div>
                    ))}
                </div>
            ) : error ? (
                <p className="text-center text-red-600 py-10">{error}</p>
            ) : displayedBooks.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-10">
                    📭 لا توجد كتب ضمن هذا التصنيف حاليًا.
                </p>
            ) : (
                <>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                        }}
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {displayedBooks.map((book) => (
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

                    {/* 🔽 زر تحميل المزيد */}
                    {visibleBooks.length < books.length && (
                        <div className="text-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className={`px-6 py-2 rounded-lg text-white transition ${loadingMore
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loadingMore
                                    ? "جار التحميل..."
                                    : showSold
                                        ? "تحميل المزيد من الكتب المباعة ⬇️"
                                        : "تحميل المزيد من الكتب المتاحة ⬇️"}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* 🔝 زر الرجوع للأعلى */}
            <ScrollTopButton />
        </div>
    );
}
