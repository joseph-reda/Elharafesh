// src/components/SearchBar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchBooks } from "../services/booksService.js";

// دالة تنظيف النص العربي (تُحوّل كل أنواع الألف إلى "ا" عادي وتزيل الهمزات)
const normalizeArabic = (str) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .trim()
        .replace(/[\u0622\u0623\u0625\u0627\u0671\u0672\u0673\u0674\u0675]/g, "ا") // كل أنواع الألف → ا
        .replace(/ة/g, "ه")
        .replace(/ي/g, "ى")
        .replace(/[إأآ]/g, "ا")
        .replace(/ء/g, "")
        .replace(/\s+/g, " "); // مسافات متعددة → مسافة واحدة
};

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks()
            .then((data) => setBooks(data))
            .catch(() => toast.error("فشل تحميل الكتب للبحث"));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setKeyword(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const normalizedInput = normalizeArabic(value);

        const filtered = books
            .filter((book) => {
                const title = normalizeArabic(book.title || "");
                const author = normalizeArabic(book.author || "");
                return title.includes(normalizedInput) || author.includes(normalizedInput);
            })
            .slice(0, 6);

        setSuggestions(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (!trimmed) {
            toast.error("أدخل كلمة للبحث");
            return;
        }

        const normalized = normalizeArabic(trimmed);
        const results = books.filter((book) => {
            const t = normalizeArabic(book.title || "");
            const a = normalizeArabic(book.author || "");
            return t.includes(normalized) || a.includes(normalized);
        });

        navigate("/search", { state: { results, keyword: trimmed } });
        setKeyword("");
        setSuggestions([]);
    };

    const handleSuggestionClick = (bookId) => {
        navigate(`/book/${bookId}`);
        setKeyword("");
        setSuggestions([]);
    };

    return (
        <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="ابحث بالعنوان أو اسم المؤلف..."
                    className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm text-lg"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
                >
                    بحث
                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    {suggestions.map((book) => (
                        <li
                            key={book.id}
                            onClick={() => handleSuggestionClick(book.id)}
                            className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-gray-100 last:border-0"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">{book.title}</p>
                                <p className="text-sm text-gray-500">{book.author}</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {book.price} ج.م
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}