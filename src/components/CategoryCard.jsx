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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full px-4 py-2 rounded-lg text-center font-medium shadow-sm transition-colors duration-200 ${
                selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-100"
            }`}
        >
            {title}
        </motion.button>
    );
}
