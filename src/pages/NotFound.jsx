// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20 text-right"
        >
            <h1 className="text-4xl font-extrabold text-red-600 mb-4">
                404 — الصفحة غير موجودة
            </h1>
            <p className="text-gray-600 mb-6">
                عذرًا، الصفحة التي تبحث عنها غير متوفرة أو قد تم نقلها.
            </p>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
                🔙 العودة إلى الرئيسية
            </Link>
        </motion.div>
    );
}
