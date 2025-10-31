// ✅ src/pages/Category.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    ref,
    query,
    orderByChild,
    endBefore,
    limitToLast,
    get,
} from "firebase/database";
import { db } from "../firebase";
import BookCard from "../components/BookCard";
import CategoryCard from "../components/CategoryCard";
import ScrollTopButton from "../components/ScrollTopButton";

const categories = ["تاريخ", "رواية", "غير روائي", "مترجم", "عربي"];

export default function Category() {
    const { name } = useParams();
    const [books, setBooks] = useState([]);
    const [lastBookId, setLastBookId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 20;

    // 📦 تحميل أول دفعة
    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 🔹 دالة تحميل الكتب من Firebase
    const fetchBooks = async (loadMore = false) => {
        try {
            if (loadMore) setLoadingMore(true);
            else setLoading(true);

            let booksRef;
            if (loadMore && lastBookId) {
                booksRef = query(
                    ref(db, "books"),
                    orderByChild("id"),
                    endBefore(lastBookId),
                    limitToLast(PAGE_SIZE)
                );
            } else {
                booksRef = query(ref(db, "books"), orderByChild("id"), limitToLast(PAGE_SIZE));
            }

            const snapshot = await get(booksRef);
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val());

                // ✅ ترتيب الكتب: المتاحة أولاً، ثم المباعة، ثم الأحدث
                const sorted = data.sort((a, b) => {
                    if (a.status === "available" && b.status === "sold") return -1;
                    if (a.status === "sold" && b.status === "available") return 1;
                    return b.id - a.id; // الأحدث أولاً
                });

                if (loadMore) {
                    setBooks((prev) => [...prev, ...sorted]);
                } else {
                    setBooks(sorted);
                }

                // تحديث مؤشر آخر كتاب
                const last = sorted[sorted.length - 1];
                setLastBookId(last ? last.id : null);

                // تحديد إذا ما زال هناك كتب إضافية
                setHasMore(sorted.length === PAGE_SIZE);
            } else {
                if (!loadMore) setBooks([]);
                setHasMore(false);
            }
        } catch (err) {
            console.error("❌ خطأ أثناء جلب الكتب:", err);
            setError("حدث خطأ أثناء تحميل البيانات.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // 🔍 فلترة الكتب حسب التصنيف
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

    // ✅ إعادة ترتيب النتائج بعد الفلترة أيضًا
    const displayedBooks = [...filteredBooks].sort((a, b) => {
        if (a.status === "available" && b.status === "sold") return -1;
        if (a.status === "sold" && b.status === "available") return 1;
        return b.id - a.id;
    });

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
                    {hasMore && (
                        <div className="text-center mt-8">
                            <button
                                onClick={() => fetchBooks(true)}
                                disabled={loadingMore}
                                className={`px-6 py-2 rounded-lg text-white transition ${loadingMore
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loadingMore ? "جار التحميل..." : "تحميل المزيد ⬇️"}
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
