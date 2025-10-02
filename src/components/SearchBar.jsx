// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books.json";
import toast from "react-hot-toast";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // تحديث الاقتراحات أثناء الكتابة
    const handleChange = (e) => {
        const value = e.target.value;
        setKeyword(value);

        if (value.trim().length === 0) {
            setSuggestions([]);
            return;
        }

        const query = value.toLowerCase();
        const filtered = books.filter(
            (book) =>
                book.title?.toLowerCase().includes(query) ||
                book.author?.toLowerCase().includes(query)
        );

        setSuggestions(filtered.slice(0, 5)); // نعرض 5 اقتراحات بس
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        const query = trimmed.toLowerCase();

        if (!query) {
            toast.error("⚠️ من فضلك أدخل كلمة للبحث");
            return;
        }

        const results = books.filter((book) => {
            const title = book.title?.toLowerCase() || "";
            const author = book.author?.toLowerCase() || "";
            return title.includes(query) || author.includes(query);
        });

        if (results.length === 0) {
            toast("❌ لا توجد نتائج لهذا البحث", { icon: "📭" });
        }

        navigate(`/search?q=${encodeURIComponent(trimmed)}`, {
            state: { results, keyword: trimmed },
        });

        setKeyword("");
        setSuggestions([]);
    };

    const handleSuggestionClick = (bookId) => {
        navigate(`/book/${bookId}`);
        setKeyword("");
        setSuggestions([]);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 w-full"
                aria-label="شريط البحث"
            >
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
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

            {/* قائمة الاقتراحات */}
            {suggestions.length > 0 && (
                <ul className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-full max-h-60 overflow-y-auto">
                    {suggestions.map((book) => (
                        <li
                            key={book.id}
                            onClick={() => handleSuggestionClick(book.id)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 flex justify-between items-center"
                        >
                            <span className="font-medium text-gray-700">{book.title}</span>
                            <span className="text-sm text-gray-500">{book.author}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
