import { useParams } from "react-router-dom";
import books from "../data/books.json";

export default function BookDetails() {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return <p className="text-center mt-8 text-red-600 text-lg">الكتاب غير موجود.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 text-right font-sans space-y-8 bg-blue-50 min-h-screen">
            {/* العنوان */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 border-r-4 border-blue-600 pr-4">
                {book.title}
            </h1>

            {/* صورة الغلاف والمعلومات */}
            <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-6 rounded-xl shadow-md">
                <img
                    src={`/${book.cover}`}
                    alt={book.title}
                    className="w-full md:w-64 h-auto rounded-lg border border-blue-200 object-cover"
                />

                <div className="space-y-3 flex-1 text-gray-800">
                    <p className="text-lg">
                        <span className="font-semibold text-blue-700">✍️ المؤلف: </span>{book.author}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-blue-700">📚 القسم: </span>{book.category}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-blue-700">📝 النوع: </span>{book.type}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-blue-700">💵 السعر: </span>{book.price}
                    </p>
                </div>
            </div>

            {/* الملخص */}
            <div className="bg-white border-r-4 border-blue-600 p-6 rounded-xl shadow-md text-gray-800">
                <h2 className="text-2xl font-bold mb-3 text-blue-700">📖 الملخص</h2>
                <p className="leading-relaxed">{book.description}</p>
            </div>

            {/* زر الحجز أو بديل للتواصل */}
            <div className="flex justify-end">
                {book.facebookPost ? (
                    <a
                        href={book.facebookPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition font-medium text-lg"
                    >
                        🛒 احجز عبر فيسبوك
                    </a>
                ) : (
                    <a
                        href="https://wa.me/201234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition font-medium text-lg"
                    >
                        💬 تواصل عبر واتساب
                    </a>
                )}
            </div>
        </div>
    );
}
