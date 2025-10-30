// 📘 src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart();

    const navLinks = [
        { path: "/", label: "الرئيسية" },
        { path: "/category", label: "الكتب" },
        { path: "/contact", label: "تواصل معنا" },
    ];

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

                {/* الشعار دائماً على اليسار */}
                <NavLink to="/" className="flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="شعار الموقع"
                        className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
                    />
                </NavLink>

                {/* روابط التنقل للحواسيب */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg transition ${isActive
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <NavLink to="/cart" className="relative">
                        <FiShoppingCart className="text-2xl text-blue-700" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                                {cart.length}
                            </span>
                        )}
                    </NavLink>
                </div>

                {/* تصميم الموبايل */}
                <div className="md:hidden flex items-center justify-end gap-4">
                    {/* رابط الكتب + السلة */}
                    <div className="flex items-center gap-4">
                        <NavLink
                            to="/category"
                            className="text-gray-800 text-base font-medium hover:text-blue-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            جميع الكتب
                        </NavLink>

                        <NavLink to="/cart" className="relative">
                            <FiShoppingCart className="text-2xl text-blue-700" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                                    {cart.length}
                                </span>
                            )}
                        </NavLink>
                    </div>

                    {/* زر القائمة */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-700"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* القائمة المنسدلة للموبايل */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-inner border-t border-gray-200 px-5 py-3 space-y-2 text-center">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base ${isActive
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}
