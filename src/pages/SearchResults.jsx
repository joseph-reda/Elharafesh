// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books.json";

export default function SearchBar() {
    const [filter, setFilter] = useState("all"); // القيمة الافتراضية = الكل
    const navigate = useNavigate();

    // تطبيق الفلتر
    const handleSubmit = (e) => {
        e.preventDefault();

        let results = [];

        switch (filter) {
            case "novel": // روائي
                results = books.filter((book) => book.category === "روائي");
                break;

            case "non-novel": // غير روائي
                results = books.filter((book) => book.category !== "روائي");
                break;

            case "translated": // مترجم
                results = books.filter((book) => book.type === "مترجم");
                break;

            case "arabic": // عربي
                results = books.filter((book) => book.type === "عربي");
                break;

            default: // الكل
                results = books;
                break;
        }

        // الذهاب لصفحة النتائج
        navigate("/search", {
            state: { results, keyword: filter },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 w-full max-w-xl mx-auto"
            aria-label="شريط البحث"
        >
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">📚 الكل</option>
                <option value="novel">📖 روائي</option>
                <option value="non-novel">📘 غير روائي</option>
                <option value="translated">🌍 مترجم</option>
                <option value="arabic">🇪🇬 عربي</option>
            </select>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
                عرض
            </button>
        </form>
    );
}
