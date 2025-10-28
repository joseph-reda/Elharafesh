// 📘 src/components/CategoryCard.jsx
import { motion } from "framer-motion";

/**
 * مكوّن CategoryCard:
 * يعرض فئة (تصنيف) بستايل جميل وتفاعلي مع حركة لطيفة عند المرور أو النقر.
 */
export default function CategoryCard({
    title = "بدون عنوان",
    onClick = () => { },
    selected = false,
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 min-w-[110px] rounded-xl font-semibold text-sm md:text-base text-center select-none
                transition-all duration-300 shadow-sm border
                ${selected
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-700 shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
        >
            {title}
        </motion.button>
    );
}
