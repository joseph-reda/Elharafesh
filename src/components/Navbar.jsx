// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext"; // ✅ استدعاء السياق

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart(); // ✅ جلب السلة من السياق

    const navLinks = [
        { path: "/", label: "الرئيسية" },
        { path: "/category", label: "الكتب" },
        { path: "/cart", label: "سلة التسوق" },
        { path: "/contact", label: "تواصل معنا" },
    ];

    const container = {
        hidden: { opacity: 0, y: -20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.12, duration: 0.5 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.nav
            initial="hidden"
            animate="show"
            variants={container}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-blue-100"
        >
            <div className="flex justify-between items-center px-6 py-4 md:flex-row-reverse">
                {/* ✅ الشعار (على اليسار دائماً) */}
                <motion.div variants={item}>
                    <NavLink to="/" className="w-14 block">
                        <img
                            src="/images/logo.png"
                            alt="شعار الموقع"
                            className="rounded-full border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300 "
                        />
                    </NavLink>
                </motion.div>

                {/* ✅ روابط الديسكتوب (يمين) */}
                <motion.div
                    className="hidden md:flex items-center gap-6 text-sm sm:text-base md:text-lg font-medium "
                    variants={container}
                >
                    {navLinks.map((link) => (
                        <motion.div key={link.path} variants={item}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-3 py-1 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? "text-blue-700 font-semibold bg-blue-100"
                                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ✅ أيقونة السلة + زر القائمة (يمين في الموبايل) */}
                <div className="flex items-center gap-4 md:hidden relative">
                    <NavLink to="/cart" className="relative">
                        <FiShoppingCart className="text-2xl text-blue-700 hover:text-blue-600 transition" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                                {cart.length}
                            </span>
                        )}
                    </NavLink>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-700 hover:text-blue-700 transition"
                        aria-label="فتح القائمة"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* قائمة الموبايل المنسدلة */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-inner px-6 py-4 space-y-3 border-t border-gray-200"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-2 py-2 rounded-md ${
                                        isActive
                                            ? "bg-blue-100 text-blue-700 font-semibold"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
