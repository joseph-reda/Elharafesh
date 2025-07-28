import BookCard from "./BookCard";

export default function BookGrid({ books = [] }) {
    if (!books.length) {
        return (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
                لا توجد كتب لعرضها حالياً.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-right font-sans">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}
