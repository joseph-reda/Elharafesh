// src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // يمكنك لاحقًا استبدال هذا بـ Firebase Authentication الحقيقي
        const ADMIN_EMAIL = "elhara@gmail.com";     // غيّرها لاحقًا
        const ADMIN_PASS = "008800";              // غيّرها لاحقًا

        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            localStorage.setItem("isAdmin", "true");
            sessionStorage.setItem("isAdmin", "true");
            toast.success("مرحباً بك في لوحة التحكم");
            navigate("/admin/manage-books");
        } else {
            toast.error("بيانات الدخول غير صحيحة");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    تسجيل دخول الإدارة
                </h2>

                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70"
                >
                    {loading ? "جاري تسجيل الدخول..." : "دخول"}
                </button>
            </form>
        </div>
    );
}