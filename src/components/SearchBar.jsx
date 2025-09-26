// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books.json";
import toast from "react-hot-toast";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    // دالة البحث
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();

        // التحقق من الإدخال
        if (!trimmed) {
            toast.error("⚠️ من فضلك أدخل كلمة للبحث");
            return;
        }

        // البحث في العنوان + المؤلف
        const results = books.filter(
            (book) =>
                book.title.toLowerCase().includes(trimmed.toLowerCase()) ||
                book.author?.toLowerCase().includes(trimmed.toLowerCase())
        );

        // إذا مفيش نتائج
        if (results.length === 0) {
            toast("❌ لا توجد نتائج لهذا البحث", { icon: "📭" });
            return;
        }

        // الذهاب لصفحة النتائج
        navigate("/search", {
            state: { results, keyword: trimmed },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 w-full max-w-xl mx-auto"
            aria-label="شريط البحث"
        >
            <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="🔍 ابحث عن كتاب أو مؤلف..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
                بحث
            </button>
        </form>
    );
}
