// src/pages/SearchResults.jsx
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function SearchResults() {
    const location = useLocation();
    const { results = [], keyword = "" } = location.state || {};

    return (
        <main className="px-4 md:px-12 py-8 text-right font-sans">
            <h1 className="text-2xl font-bold text-blue-800 mb-6">
                نتائج البحث عن: "<span className="text-gray-700">{keyword}</span>"
            </h1>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-lg text-center py-10">
                    📭 لا توجد نتائج مطابقة للبحث.
                </p>
            )}
        </main>
    );
}
