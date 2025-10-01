// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
    const navLinks = [
        { path: "/", label: "الرئيسية" },
        { path: "/category", label: "تسوق" },
        { path: "/favorites", label: "المفضلة" },
        { path: "/contact", label: "تواصل معنا" },
    ];

    // Variants للأنيميشن
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
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md py-3 px-6 flex justify-between items-center flex-row-reverse border-b border-blue-100 text-right"
        >
            {/* الشعار */}
            <motion.div variants={item}>
                <NavLink to="/" className="w-16 block">
                    <img
                        src="/images/logo.png"
                        alt="شعار الموقع"
                        className="rounded-full border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300"
                    />
                </NavLink>
            </motion.div>

            {/* روابط التنقل */}
            <motion.div
                className="flex items-center gap-4 text-sm sm:text-base md:text-lg font-medium"
                variants={container}
            >
                {navLinks.map((link) => (
                    <motion.div key={link.path} variants={item}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `px-2 py-1 rounded-lg transition-all duration-200 ${
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
        </motion.nav>
    );
}
