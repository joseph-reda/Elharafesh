// src/pages/Home.jsx
import { useQuery } from "@tanstack/react-query";
import BookGrid from "../components/BookGrid";
import { motion } from "framer-motion";
import { fetchBooks } from "../services/booksService.js";
import { Link } from "react-router-dom";

export default function Home() {
    const { data: books = [], isLoading, error } = useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    // ✅ آخر 10 كتب فقط
    const latestBooks = [...books].reverse().slice(0, 10);

    if (isLoading)
        return (
            <main className="text-center py-20 text-gray-600 text-lg">
                ⏳ جاري تحميل الكتب...
            </main>
        );

    if (error)
        return (
            <main className="text-center py-20 text-red-600 text-lg">
                ❌ حدث خطأ أثناء تحميل الكتب
            </main>
        );

    return (
        <main className="text-right px-4 md:px-12 py-8 space-y-12 font-sans bg-gray-50">
            {/* 🏷️ شريط الترحيب */}
            <motion.div
                className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-4 px-4 rounded-xl shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-lg md:text-xl font-semibold mb-2">
                    📚 مرحبًا بكم في مكتبة الحرافيش للكتب المستعملة والقديمة
                </p>
                <Link
                    to="/category"
                    className="inline-block bg-white text-blue-700 font-bold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    تصفّح الكتب الآن
                </Link>
            </motion.div>

            {/* 🌟 قسم الترحيب والمعلومات */}
            <motion.section
                aria-label="قسم الترحيب"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md border-r-4 border-blue-400"
            >
                <header className="text-center md:text-right">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
                        👋 أهلًا وسهلًا بكم في مكتبة الحرافيش
                    </h1>
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                        يسعدنا تواصلكم معنا ❤
                        <br />
                        نقدم لكم مجموعة مميزة من الكتب الأدبية، الفكرية، الدينية، والروايات
                        النادرة — جميعها بحالة ممتازة وأسعار مناسبة جدًا 👌
                    </p>
                </header>

                <div className="mt-6 text-gray-700 space-y-3 leading-relaxed text-md md:text-lg">
                    <p>
                        ⚙️ <strong>للحجز أو الاستفسار:</strong> يرجى إرسال اسم الكتاب أو صورته
                        عبر{" "}
                        <span className="text-blue-700 font-semibold">واتساب أو فيسبوك</span>،
                        وسنقوم بالرد في أقرب وقت ممكن.
                    </p>

                    <p>
                        💳 <strong>طرق الدفع:</strong>
                        <br />• فودافون كاش:{" "}
                        <span className="text-blue-700 font-semibold">01034345458</span>
                        <br />• إنستاباي:{" "}
                        <span className="text-blue-700 font-semibold">
                            nehru_gamal@instapay
                        </span>
                    </p>

                    <p>
                        🚚 <strong>التوصيل:</strong> يتم التسليم كل{" "}
                        <span className="font-semibold text-blue-700">يوم سبت في سوق ديانا</span>،
                        كما يتوفر التوصيل إلى المنازل عن طريق البريد المصري.
                        <br />
                        💰 <em>سعر الشحن يبدأ من 40 جنيهًا مصريًا</em> ويختلف حسب وزن الكتب وعددها.
                    </p>

                    <p>
                        ⏰ <strong>مواعيد نشر الكتب:</strong> نقوم بإضافة الكتب الجديدة من{" "}
                        <span className="text-blue-700 font-semibold">
                            الأحد إلى الخميس في تمام الساعة 9 مساءً
                        </span>
                        .
                    </p>

                    <p>
                        🌐 <strong>يمكنكم متابعتنا علي الفيس بوك :</strong>{" "}
                        <a
                            href="https://www.facebook.com/share/1A7iNw3nGi/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline hover:text-blue-800"
                        >
                            الحرافيش
                        </a>
                    </p>
                </div>
            </motion.section>

            {/* 📢 إعلان الحجز اليومي */}
            {/* 🆕 آخر 10 كتب */}
            <motion.section
                aria-label="آخر الكتب المضافة"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-r-4 border-blue-600 pr-3">
                    🆕 أحدث 10 كتب تمت إضافتها
                </h2>

                {latestBooks.length > 0 ? (
                    <>
                        <BookGrid books={latestBooks} />
                        <div className="mt-6 text-center">
                            <Link
                                to="/category"
                                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-8 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                            >
                                تصفّح جميع الكتب
                            </Link>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600 text-center text-lg">
                        📭 لا توجد كتب متاحة حاليًا.
                    </p>
                )}
            </motion.section>
        </main>
    );
}
