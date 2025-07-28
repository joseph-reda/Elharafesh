import React, { useEffect, useState } from "react";
import booksData from "../data/books.json";
import { useFavorites } from "../context/FavoriteContext";

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites();
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        const matchedBooks = booksData.filter((book) => favorites.includes(book.id));
        setFavoriteBooks(matchedBooks);
    }, [favorites]);

    if (favoriteBooks.length === 0) {
        return (
            <div className="text-center mt-24 text-xl text-gray-600 font-medium">
                📭 لا توجد كتب مفضلة حالياً
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-right font-sans">
            <h1 className="text-3xl font-extrabold text-blue-800 mb-8">📚 الكتب المفضلة</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteBooks.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
                    >
                        <img
                            src={book.cover || "/placeholder.png"}
                            alt={book.title}
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-blue-800 mb-1">{book.title}</h2>
                                <p className="text-gray-700 text-sm">✍️ المؤلف: {book.author}</p>
                                <p className="text-gray-600 text-sm">📚 القسم: {book.category}</p>
                                <p className="text-gray-700 text-sm">💵 السعر: {book.price}</p>
                                <p className="text-gray-800 text-sm mt-2 leading-relaxed">{book.description}</p>
                            </div>

                            <div className="mt-4 space-y-2">
                                <a
                                    href={book.facebookPost}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded"
                                >
                                    🛒 احجز الآن عبر فيسبوك
                                </a>

                                <button
                                    onClick={() => removeFavorite(book.id)}
                                    className="w-full text-center bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 rounded text-sm"
                                >
                                    🗑️ إزالة من المفضلة
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
