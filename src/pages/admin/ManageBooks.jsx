// ✅ src/pages/admin/ManageBooks.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, get, update, remove } from "firebase/database";
import {
    getStorage,
    ref as sRef,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [savingAll, setSavingAll] = useState(false);
    const navigate = useNavigate();
    const storage = getStorage();

    // ✅ تحقق من تسجيل الدخول
    useEffect(() => {
        const adminLoggedIn = localStorage.getItem("isAdmin");
        if (!adminLoggedIn) navigate("/admin/login");
    }, [navigate]);

    // ✅ جلب الكتب
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
                    setBooks(booksArray.sort((a, b) => b.id - a.id));
                    setFilteredBooks(booksArray);
                } else {
                    toast.error("📭 لا توجد كتب بعد");
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

    // ✅ البحث الفوري
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredBooks(
            books.filter(
                (b) =>
                    b.title?.toLowerCase().includes(term) ||
                    b.author?.toLowerCase().includes(term)
            )
        );
    }, [searchTerm, books]);

    // ✅ تعديل محلي
    const handleChange = (key, field, value) => {
        setBooks((prev) =>
            prev.map((book) => (book.key === key ? { ...book, [field]: value } : book))
        );
    };

    // ✅ رفع عدة صور
    const handleImagesUpload = async (key, files) => {
        if (!files || files.length === 0) return;

        const selectedFiles = Array.from(files);
        const uploadedUrls = [];

        try {
            for (const file of selectedFiles) {
                const imageRef = sRef(storage, `book_images/${Date.now()}_${file.name}`);
                await uploadBytes(imageRef, file);
                const url = await getDownloadURL(imageRef);
                uploadedUrls.push(url);
            }

            setBooks((prev) =>
                prev.map((book) =>
                    book.key === key
                        ? {
                            ...book,
                            images: [...(book.images || []), ...uploadedUrls],
                        }
                        : book
                )
            );

            toast.success("📷 تم رفع الصور بنجاح");
        } catch (err) {
            toast.error("❌ فشل رفع الصور");
            console.error(err);
        }
    };

    // ✅ حذف صورة معينة
    const handleDeleteImage = async (key, imageUrl) => {
        try {
            // حذف من التخزين
            const imagePath = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
            const imageRef = sRef(storage, imagePath);
            await deleteObject(imageRef).catch(() => { });

            // تحديث قاعدة البيانات محليًا
            setBooks((prev) =>
                prev.map((book) =>
                    book.key === key
                        ? {
                            ...book,
                            images: (book.images || []).filter((img) => img !== imageUrl),
                        }
                        : book
                )
            );

            toast.success("🗑️ تم حذف الصورة");
        } catch (err) {
            toast.error("❌ فشل حذف الصورة");
            console.error(err);
        }
    };

    // ✅ حفظ كتاب واحد
    const handleSave = async (book) => {
        try {
            await update(ref(db, `books/${book.key}`), book);
            toast.success(`✅ تم حفظ "${book.title}"`);
        } catch {
            toast.error("❌ فشل الحفظ");
        }
    };

    // ✅ حذف كتاب
    const handleDeleteBook = async (key, title) => {
        if (!window.confirm(`هل أنت متأكد من حذف "${title}"؟`)) return;
        try {
            await remove(ref(db, `books/${key}`));
            setBooks((prev) => prev.filter((b) => b.key !== key));
            toast.success("🗑️ تم حذف الكتاب");
        } catch {
            toast.error("❌ فشل حذف الكتاب");
        }
    };

    // ✅ حفظ الكل
    const handleSaveAll = async () => {
        try {
            setSavingAll(true);
            const updates = {};
            books.forEach((book) => (updates[`books/${book.key}`] = book));
            await update(ref(db), updates);
            toast.success("💾 تم حفظ جميع التعديلات");
        } catch {
            toast.error("❌ فشل الحفظ الكلي");
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
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
            <Toaster />

            {/* شريط البحث وحفظ الكل */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <h2 className="text-3xl font-extrabold text-blue-700">🛠️ إدارة الكتب</h2>

                <input
                    type="text"
                    placeholder="🔍 ابحث باسم الكتاب أو المؤلف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleSaveAll}
                    disabled={savingAll}
                    className={`${savingAll
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white px-6 py-2 rounded-lg font-semibold shadow transition`}
                >
                    {savingAll ? "💾 جاري الحفظ..." : "💾 حفظ الكل"}
                </button>
            </div>

            {/* بطاقات الكتب */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {filteredBooks.map((book) => (
                    <motion.div
                        key={book.key}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col"
                    >
                        {/* 🖼️ الصور */}
                        <div className="relative bg-gray-50 p-3 grid grid-cols-3 gap-2">
                            {(book.images || []).length > 0 ? (
                                book.images.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={img}
                                            alt={`img-${idx}`}
                                            className="w-full h-24 object-cover rounded-lg border"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(book.key, img)}
                                            className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-400">
                                    لا توجد صور
                                </p>
                            )}

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImagesUpload(book.key, e.target.files)}
                                className="col-span-3 text-sm border rounded-lg px-2 py-1 cursor-pointer mt-2"
                            />
                        </div>

                        {/* 📝 التفاصيل */}
                        <div className="p-4 flex flex-col flex-1 space-y-3">
                            <input
                                type="text"
                                value={book.title || ""}
                                onChange={(e) =>
                                    handleChange(book.key, "title", e.target.value)
                                }
                                className="font-bold text-lg border rounded-lg px-2 py-1"
                            />

                            <input
                                type="text"
                                value={book.author || ""}
                                onChange={(e) =>
                                    handleChange(book.key, "author", e.target.value)
                                }
                                className="text-gray-700 border rounded-lg px-2 py-1"
                            />

                            <input
                                type="number"
                                value={book.price || ""}
                                onChange={(e) =>
                                    handleChange(book.key, "price", e.target.value)
                                }
                                placeholder="السعر"
                                className="text-gray-700 border rounded-lg px-2 py-1"
                            />

                            <textarea
                                value={book.description || ""}
                                onChange={(e) =>
                                    handleChange(book.key, "description", e.target.value)
                                }
                                placeholder="الوصف..."
                                className="border rounded-lg px-2 py-1 h-20 text-sm resize-none"
                            />

                            <select
                                value={book.category}
                                onChange={(e) =>
                                    handleChange(book.key, "category", e.target.value)
                                }
                                className="border rounded-lg px-2 py-1"
                            >
                                <option value="رواية">رواية</option>
                                <option value="تاريخ">تاريخ</option>
                                <option value="فلسفة">فلسفة</option>
                                <option value="علم نفس">علم نفس</option>
                                <option value="شعر">شعر</option>
                                <option value="سيرة ذاتية">سيرة ذاتية</option>
                                <option value="سياسة">سياسة</option>
                            </select>

                            <select
                                value={book.status}
                                onChange={(e) =>
                                    handleChange(book.key, "status", e.target.value)
                                }
                                className={`border rounded-lg px-2 py-1 ${book.status === "sold"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                            >
                                <option value="available">📗 متاح</option>
                                <option value="sold">📕 تم البيع</option>
                            </select>
                        </div>

                        {/* ⚙️ أزرار التحكم */}
                        <div className="flex justify-between p-4 border-t">
                            <button
                                onClick={() => handleSave(book)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
                            >
                                💾 حفظ
                            </button>
                            <button
                                onClick={() => handleDeleteBook(book.key, book.title)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                            >
                                🗑️ حذف
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
