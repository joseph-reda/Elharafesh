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

    // Animation Variants
    const container = {
        hidden: { opacity: 0, y: -20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, duration: 0.6 },
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
            className="bg-white shadow-md py-3 px-6 flex justify-between items-center flex-row-reverse border-b border-blue-100 text-right"
        >
            {/* الشعار */}
            <motion.div variants={item}>
                <NavLink to="/" className="w-16 block">
                    <img
                        src="/images/logo.png"
                        alt="شعار الموقع"
                        className="rounded-full border border-gray-300 shadow-sm"
                    />
                </NavLink>
            </motion.div>

            {/* روابط التنقل */}
            <motion.div
                className="flex items-center gap-4 text-sm sm:text-base md:text-lg font-medium text-gray-700"
                variants={container}
            >
                {navLinks.map((link) => (
                    <motion.div key={link.path} variants={item}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `transition-colors duration-200 ${
                                    isActive
                                        ? "text-blue-700 font-bold"
                                        : "hover:text-blue-600"
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
