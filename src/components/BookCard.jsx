import { Link } from "react-router-dom";

export default function BookCard({ book }) {
    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden text-right border border-gray-100 relative">
            {/* Book Cover + Badge */}
            <div className="relative">
                <img
                    src={book.cover || "/placeholder.png"}
                    alt={book.title}
                    className="w-full h-72 object-cover rounded-t-2xl"
                />
                {book.isNew && (
                    <span className="absolute top-3 right-3 text-xs bg-red-600 text-white px-2 py-1 rounded-full shadow">
                        جديد
                    </span>
                )}
            </div>

            {/* Book Details */}
            <div className="p-4 space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-gray-600 text-sm">
                    ✍️ <span className="font-medium">المؤلف:</span> {book.author}
                </p>

                <p className="text-sm text-green-700 font-semibold">
                    💵 السعر: {book.price || "غير محدد"} ج.م
                </p>

                <Link
                    to={`/book/${book.id}`}
                    className="inline-block text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    عرض التفاصيل
                </Link>
            </div>
        </div>
    );
}
