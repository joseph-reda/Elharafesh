import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center flex-row-reverse border-b border-blue-100 text-right">
            {/* الشعار */}
            <Link to="/" className="w-16">
                <img
                    src="/images/logo.png"
                    alt="شعار الموقع"
                    className="rounded-full border border-gray-300 shadow-sm"
                />
            </Link>

            {/* روابط التنقل */}
            <div className="flex items-center gap-4 text-sm sm:text-base md:text-lg font-medium text-gray-700">
                <Link
                    to="/"
                    className="hover:text-blue-700 transition-colors duration-200"
                >
                    الرئيسية
                </Link>

                <Link
                    to="/category"
                    className="hover:text-blue-700 transition-colors duration-200"
                >
                    تسوق
                </Link>

                <Link
                    to="/favorites"
                    className="hover:text-blue-700 transition-colors duration-200"
                >
                    المفضلة
                </Link>
                <Link
                    to="/contact"
                    className="hover:text-blue-700 transition-colors duration-200"
                >
                    تواصل معنا
                </Link>

            </div>
        </nav>
    );
}
