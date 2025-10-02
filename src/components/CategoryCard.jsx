// src/components/CategoryCard.jsx
import { motion } from "framer-motion";

export default function CategoryCard({
    title = "بدون عنوان",
    onClick = () => {},
    selected = false,
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 min-w-[100px] rounded-xl text-center font-medium shadow-sm transition-all duration-300 
                ${selected
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-700 border border-gray-200"
                }`}
        >
            {title}
        </motion.button>
    );
}
