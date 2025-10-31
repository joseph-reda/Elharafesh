import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminHome() {
    const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isAdmin");
    navigate("/admin/login");
};

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans p-6">
            {/* 🔹 رأس الصفحة */}
            <div className="absolute top-5 left-5">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    تسجيل الخروج
                </button>
            </div>

            {/* 🧠 العنوان */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 text-center"
            >
                لوحة التحكم الخاصة بالإدارة 🔐
            </motion.h1>

            {/* 🔸 الأزرار */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md"
            >
                {/* إضافة كتاب جديد */}
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="bg-blue-600 text-white py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg font-semibold"
                >
                    📘 إضافة كتاب جديد
                </button>

                {/* إدارة الكتب */}
                    <button
                        onClick={() => navigate("/admin/manage-books")}
                        className="bg-green-600 text-white py-4 rounded-lg shadow-md hover:bg-green-700 transition-all text-lg font-semibold"
                    >
                        📚 إدارة الكتب
                    </button>
            </motion.div>
        </div>
    );
}
