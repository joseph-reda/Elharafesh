import books from "../data/books.json";
import BookGrid from "../components/BookGrid";
import { Link } from "react-router-dom";

export default function Home() {
    const newBooks = books.filter((book) => book.isNew);

    return (
        <main className="text-right px-4 md:px-12 py-8 space-y-12 font-sans bg-gray-50">

            {/* قسم الترحيب */}
            <section
                aria-label="الترحيب بالمستخدم"
                className="bg-blue-50 p-6 md:p-10 rounded-xl shadow-md"
            >
                <header className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 leading-relaxed mb-4">
                            مرحبًا بك في مكتبة الحرافيش
                            <br />
                            لبيع الكتب المستعملة والقديمة
                        </h1>
                        <p className="text-gray-700 text-md md:text-lg leading-loose">
                            اكتشف أحدث الكتب العربية والمترجمة، بنكهة شعبية وتراثية،
                            تجمع بين الأدب والثقافة والتاريخ.
                        </p>
                    </div>
                    <img
                        src="/images/logo.png"
                        alt="شعار مكتبة الحرافيش"
                        className="w-48 md:w-60 rounded-full border-4 border-blue-200 shadow-md"
                    />
                </header>
            </section>

            {/* نظام الحجز */}
            <section
                aria-label="نظام الحجز"
                className="bg-white border-r-4 border-blue-700 p-5 rounded-lg shadow-sm text-gray-800 text-lg leading-relaxed"
            >
                <p>
                    🕙 يتم نشر مجموعة جديدة من الكتب يوميًا في الساعة <strong>9 مساءً</strong> على صفحتنا على الفيسبوك.
                    <br />
                    للحجز، يُرجى كتابة تعليق على منشور الكتاب أو التواصل معنا عبر
                    واتساب أو ماسنجر.
                </p>
            </section>

            {/* الكتب الجديدة */}
            <section aria-label="الكتب الجديدة اليوم">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-r-4 border-blue-600 pr-3">
                    📚 الكتب الجديدة اليوم
                </h2>

                {newBooks.length > 0 ? (
                    <>
                        <BookGrid books={newBooks} />
                        <div className="mt-6 text-center">
                            <Link
                                to="/category"
                                className="inline-block bg-blue-600 text-white text-lg px-8 py-2 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                عرض المزيد
                            </Link>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">لا توجد كتب جديدة حاليًا.</p>
                )}
            </section>
        </main>
    );
}
