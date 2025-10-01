// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books.json";
import toast from "react-hot-toast";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = keyword.trim().toLowerCase();

        if (!query) {
            toast.error("⚠️ من فضلك أدخل كلمة للبحث");
            return;
        }

        // البحث بالعنوان أو المؤلف
        const results = books.filter((book) => {
            const title = book.title?.toLowerCase() || "";
            const author = book.author?.toLowerCase() || "";
            return title.includes(query) || author.includes(query);
        });

        // إذا لا توجد نتائج
        if (results.length === 0) {
            toast("❌ لا توجد نتائج لهذا البحث", { icon: "📭" });
        }

        // الانتقال لصفحة البحث مع تمرير النتائج والـ keyword
        navigate(`/search?q=${encodeURIComponent(query)}`, {
            state: { results, keyword: keyword.trim() },
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="🔍 ابحث باسم الكتاب أو اسم الكاتب..."
                aria-label="ابحث باسم الكتاب أو المؤلف"
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow transition font-medium"
            >
                بحث
            </button>
        </form>
    );
}
