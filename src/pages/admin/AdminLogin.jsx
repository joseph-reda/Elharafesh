// ✅ src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const ADMIN_EMAIL = "elhara@gmail.com";
        const ADMIN_PASSWORD = "008800";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // ✅ حفظ الجلسة في localStorage و sessionStorage معًا
            localStorage.setItem("isAdmin", "true");
            sessionStorage.setItem("isAdmin", "true");

            // ✅ الانتقال إلى صفحة الخيارات
            navigate("/admin/home", { replace: true });
        } else {
            setError("بيانات الدخول غير صحيحة");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700">
                    تسجيل دخول الإدارة
                </h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div>
                    <label className="block mb-1 text-gray-600">البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-600">كلمة المرور</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    دخول
                </button>
            </form>
        </div>
    );
}
