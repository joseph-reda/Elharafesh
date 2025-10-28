// 📘 src/components/BookGrid.jsx
import BookCard from "./BookCard";
import { motion } from "framer-motion";

/**
 * مكوّن BookGrid:
 * يعرض شبكة من البطاقات الخاصة بالكتب.
 * يتعامل تلقائيًا مع حالة عدم وجود كتب.
 */
export default function BookGrid({ books = [] }) {
    // 🧩 في حال عدم وجود كتب
    if (!Array.isArray(books) || books.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
                📭 لا توجد كتب متاحة حالياً.
            </div>
        );
    }

    // 🎬 إعدادات الحركة (Framer Motion)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-right font-sans"
        >
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </motion.div>
    );
}
