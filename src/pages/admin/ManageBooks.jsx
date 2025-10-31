// ✅ src/pages/admin/ManageBooks.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, get, update } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [savingAll, setSavingAll] = useState(false);
    const navigate = useNavigate();

    // ✅ التحقق من تسجيل الدخول
    useEffect(() => {
        const adminLoggedIn = localStorage.getItem("isAdmin");
        if (!adminLoggedIn) navigate("/admin/login");
    }, [navigate]);

    // ✅ جلب الكتب من Realtime Database
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const snapshot = await get(ref(db, "books"));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const booksArray = Object.entries(data).map(([key, value]) => ({
                        key,
                        ...value,
                    }));
                    const sorted = booksArray.sort((a, b) => b.id - a.id);
                    setBooks(sorted);
                    setFilteredBooks(sorted);
                } else {
                    toast.error("📭 لا توجد كتب في قاعدة البيانات");
                }
            } catch (err) {
                toast.error("❌ خطأ أثناء تحميل الكتب");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // ✅ فلترة الكتب حسب البحث
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const results = books.filter(
            (book) =>
                book.title?.toLowerCase().includes(term) ||
                book.author?.toLowerCase().includes(term)
        );
        setFilteredBooks(results);
    }, [searchTerm, books]);

    // ✅ تعديل القيم محليًا
    const handleChange = (key, field, value) => {
        setBooks((prev) =>
            prev.map((book) => (book.key === key ? { ...book, [field]: value } : book))
        );
    };

    // ✅ حفظ تعديل كتاب واحد
    const handleSave = async (book) => {
        try {
            await update(ref(db, `books/${book.key}`), {
                category: book.category,
                status: book.status,
            });
            toast.success(`✅ تم حفظ "${book.title}" بنجاح`);
        } catch (err) {
            toast.error("❌ فشل الحفظ الفردي");
            console.error(err);
        }
    };

    // ✅ حفظ جميع التعديلات دفعة واحدة
    const handleSaveAll = async () => {
        try {
            setSavingAll(true);
            const updates = {};
            books.forEach((book) => {
                updates[`books/${book.key}`] = {
                    ...book,
                    category: book.category,
                    status: book.status,
                };
            });
            await update(ref(db), updates);
            toast.success("💾 تم حفظ جميع التعديلات بنجاح");
        } catch (err) {
            toast.error("❌ فشل حفظ جميع التعديلات");
            console.error(err);
        } finally {
            setSavingAll(false);
        }
    };

    if (loading)
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                ⏳ جاري تحميل البيانات...
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <Toaster />

            {/* 🧭 العنوان + شريط البحث + زر حفظ الكل */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-blue-700">🛠️ إدارة الكتب</h2>

                <input
                    type="text"
                    placeholder="🔍 ابحث بالعنوان أو المؤلف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleSaveAll}
                    disabled={savingAll}
                    className={`${
                        savingAll
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    } text-white px-6 py-2 rounded-lg font-semibold shadow transition`}
                >
                    {savingAll ? "💾 جاري الحفظ..." : "💾 حفظ جميع التعديلات"}
                </button>
            </div>

            {/* 📚 جدول الكتب */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-right">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-4 py-2 border">العنوان</th>
                            <th className="px-4 py-2 border">المؤلف</th>
                            <th className="px-4 py-2 border">التصنيف</th>
                            <th className="px-4 py-2 border">الحالة</th>
                            <th className="px-4 py-2 border">إجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 py-6"
                                >
                                    📭 لا توجد نتائج مطابقة
                                </td>
                            </tr>
                        ) : (
                            filteredBooks.map((book) => (
                                <tr key={book.key} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{book.title}</td>
                                    <td className="border px-4 py-2">{book.author}</td>

                                    {/* 🏷️ التصنيف */}
                                    <td className="border px-4 py-2">
                                        <select
                                            value={book.category}
                                            onChange={(e) =>
                                                handleChange(book.key, "category", e.target.value)
                                            }
                                            className="border rounded-md px-2 py-1 w-full"
                                        >
                                            <option value="رواية">رواية</option>
                                            <option value="تاريخ">تاريخ</option>
                                            <option value="فلسفة">فلسفة</option>
                                            <option value="علم نفس">علم نفس</option>
                                            <option value="شعر">شعر</option>
                                            <option value="سيرة ذاتية">سيرة ذاتية</option>
                                            <option value="سياسة">سياسة</option>
                                        </select>
                                    </td>

                                    {/* 📗 الحالة */}
                                    <td className="border px-4 py-2">
                                        <select
                                            value={book.status}
                                            onChange={(e) =>
                                                handleChange(book.key, "status", e.target.value)
                                            }
                                            className={`border rounded-md px-2 py-1 w-full ${
                                                book.status === "sold"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            <option value="available">📗 متاح</option>
                                            <option value="sold">📕 تم البيع</option>
                                        </select>
                                    </td>

                                    {/* 💾 حفظ فردي */}
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleSave(book)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
                                        >
                                            حفظ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
