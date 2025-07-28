import { useParams, Link } from "react-router-dom";
import books from "../data/books.json";
import { useFavorites } from "../context/FavoriteContext";

const categories = ["روائي", "فلسفة", "علم نفس", "تاريخ", "مترجم", "عربي"];

export default function Category() {
    const { name } = useParams();
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    const sortedBooks = [...books].sort((a, b) => b.id - a.id);

    const filteredBooks = name
        ? sortedBooks.filter((book) => {
            if (name === "مترجم" || name === "عربي") {
                return book.type?.toLowerCase() === name.toLowerCase();
            }
            return book.category?.toLowerCase() === name.toLowerCase();
        })
        : sortedBooks;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-right font-sans space-y-10">
            {/* عنوان الصفحة */}
            <h1 className="text-3xl font-extrabold text-blue-800">📚 التصنيفات</h1>

            {/* فلتر التصنيفات */}
            <div className="flex flex-wrap gap-3 justify-end">
                <Link
                    to="/category"
                    className={`px-4 py-2 rounded-lg border transition font-medium
                        ${!name
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
                >
                    الكل
                </Link>

                {categories.map((category) => (
                    <Link
                        key={category}
                        to={`/category/${category}`}
                        className={`px-4 py-2 rounded-lg border transition font-medium
                            ${name === category
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
                    >
                        {category}
                    </Link>
                ))}
            </div>

            {/* العنوان الفرعي */}
            <h2 className="text-2xl font-semibold text-blue-700 border-r-4 border-blue-600 pr-3">
                📖 {name ? `تصنيف: ${name}` : "جميع الكتب"}
            </h2>

            {/* قائمة الكتب */}
            {filteredBooks.length === 0 ? (
                <p className="text-gray-600 text-lg">لا توجد كتب ضمن هذا التصنيف حالياً.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 text-right"
                        >
                            <img
                                src={book.cover || "/placeholder.png"}
                                alt={book.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-bold text-blue-800 leading-snug line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-gray-500 text-sm">✍️ المؤلف: {book.author}</p>
                                <p className="text-green-600 font-semibold text-sm">💵 السعر: {book.price}</p>

                                {/* زر الإضافة للمفضلة */}
                                <button
                                    onClick={() =>
                                        isFavorite(book.id)
                                            ? removeFavorite(book.id)
                                            : addFavorite(book)
                                    }
                                    className={`text-sm px-4 py-1 rounded-lg transition font-medium
                                        ${isFavorite(book.id)
                                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                >
                                    {isFavorite(book.id)
                                        ? "❤️ إزالة من المفضلة"
                                        : "🤍 أضف إلى المفضلة"}
                                </button>

                                {/* زر عرض التفاصيل */}
                                <Link
                                    to={`/book/${book.id}`}
                                    className="block text-center bg-blue-600 text-white text-sm mt-3 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    عرض التفاصيل
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
