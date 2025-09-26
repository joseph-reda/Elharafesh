// src/components/BookGrid.jsx
import BookCard from "./BookCard";
import { motion } from "framer-motion";

export default function BookGrid({ books = [] }) {
    if (!Array.isArray(books) || books.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
                📭 لا توجد كتب متاحة حالياً.
            </div>
        );
    }

    // إعدادات الأنيميشن
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <motion.div
            variants={container}
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
