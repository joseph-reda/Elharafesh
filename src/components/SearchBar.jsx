import { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books.json";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();

    if (trimmed) {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(trimmed.toLowerCase())
      );

      // الانتقال إلى صفحة البحث مع النتائج
      navigate("/search", {
        state: { results, keyword: trimmed },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="ابحث عن كتاب..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="حقل البحث عن كتاب"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        بحث
      </button>
    </form>
  );
}
