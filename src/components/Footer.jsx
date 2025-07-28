export default function Footer() {
    return (
        <footer className="bg-gray-100 text-center p-4 mt-10 text-sm text-gray-600 border-t text-right rtl">
            <div className="max-w-5xl mx-auto space-y-2">
                <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمكتبة الحرافيش للكتب</p>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 text-sm">
                    <p>📞 للتواصل عبر واتساب: <a href="https://wa.me/201287666728" className="text-green-600 hover:underline">01287666728</a></p>
                    <p>📘 صفحتنا على فيسبوك:{" "}
                        <a
                            href="https://www.facebook.com/harafesh.books"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            harafesh.books
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
