// src/pages/admin/ManageBooks.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, update, remove, push } from "firebase/database";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import { ClipLoader } from "react-spinners";

const storage = getStorage();

export default function ManageBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // نموذج إضافة كتاب جديد
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        transl: "",
        type: "عربي",
        category: "",
        price: "",
        HPaper: "",
        description: "",
        status: "available",
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    // تحقق من تسجيل الدخول
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin") || sessionStorage.getItem("isAdmin");
        if (!isAdmin) navigate("/admin/login");
    }, [navigate]);

    // جلب الكتب
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const snap = await get(ref(db, "books"));
                if (snap.exists()) {
                    const data = snap.val();
                    const list = Object.entries(data).map(([key, value]) => ({
                        key,
                        ...value,
                    }));
                    const sorted = list.sort((a, b) => (b.id || 0) - (a.id || 0));
                    setBooks(sorted);
                    setFiltered(sorted);
                }
            } catch (err) {
                toast.error("فشل تحميل الكتب");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // بحث
    useEffect(() => {
        const term = search.toLowerCase();
        setFiltered(
            books.filter(
                (b) =>
                    b.title?.toLowerCase().includes(term) ||
                    b.author?.toLowerCase().includes(term)
            )
        );
    }, [search, books]);

    // إضافة كتاب جديد
    const handleAddBook = async (e) => {
        e.preventDefault();
        if (!newBook.title || !newBook.author || !newBook.category || imageFiles.length === 0) {
            toast.error("املأ الحقول الأساسية واختر صور");
            return;
        }

        setUploading(true);
        try {
            // ضغط + رفع الصور
            const compressed = await Promise.all(
                Array.from(imageFiles).map((file) =>
                    imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1200 })
                )
            );

            const urls = [];
            for (const file of compressed) {
                const fileRef = storageRef(storage, `books/${Date.now()}_${file.name}`);
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                urls.push(url);
            }

            // إضافة الكتاب
            await push(ref(db, "books"), {
                ...newBook,
                images: urls,
                createdAt: Date.now(),
            });

            toast.success("تم إضافة الكتاب بنجاح");
            setNewBook({
                title: "",
                author: "",
                transl: "",
                type: "عربي",
                category: "",
                price: "",
                HPaper: "",
                description: "",
                status: "available",
            });
            setImageFiles([]);
            setShowAddForm(false);
            // إعادة تحميل الكتب
            window.location.reload();
        } catch (err) {
            console.error(err);
            toast.error("فشل في إضافة الكتاب");
        } finally {
            setUploading(false);
        }
    };

    // تعديل حقل
    const handleChange = (key, field, value) => {
        setBooks((prev) =>
            prev.map((b) => (b.key === key ? { ...b, [field]: value } : b))
        );
    };

    // حفظ التعديلات
    const handleSave = async (book) => {
        try {
            await update(ref(db, `books/${book.key}`), {
                title: book.title,
                author: book.author,
                transl: book.transl,
                type: book.type,
                category: book.category,
                price: book.price,
                HPaper: book.HPaper,
                description: book.description,
                status: book.status,
            });
            toast.success("تم الحفظ");
        } catch {
            toast.error("فشل الحفظ");
        }
    };

    // حذف كتاب
    const handleDelete = async (book) => {
        if (!window.confirm(`هل أنت متأكد من حذف "${book.title}"؟`)) return;
        try {
            // حذف الصور من Storage
            if (book.images && Array.isArray(book.images)) {
                await Promise.all(
                    book.images.map((url) => {
                        const fileRef = storageRef(storage, url);
                        return deleteObject(fileRef).catch(() => { });
                    })
                );
            }
            await remove(ref(db, `books/${book.key}`));
            toast.success("تم الحذف");
            setBooks((prev) => prev.filter((b) => b.key !== book.key));
        } catch {
            toast.error("فشل الحذف");
        }
    };

    // تسجيل الخروج
    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        sessionStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Toaster position="top-center" />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-800">لوحة تحكم المكتبة</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                    >
                        تسجيل الخروج
                    </button>
                </div>

                {/* زر إضافة كتاب */}
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    {showAddForm ? "إلغاء" : "إضافة كتاب جديد"}
                </button>

                {/* نموذج الإضافة */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-xl shadow-lg mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">إضافة كتاب جديد</h2>
                        <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="عنوان الكتاب *"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="اسم المؤلف *"
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="المترجم (اختياري)"
                                value={newBook.transl}
                                onChange={(e) => setNewBook({ ...newBook, transl: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                            />
                            <select
                                value={newBook.type}
                                onChange={(e) => setNewBook({ ...newBook, type: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                            >
                                <option value="عربي">عربي</option>
                                <option value="مترجم">مترجم</option>
                            </select>
                            <input
                                type="text"
                                placeholder="التصنيف * (مثل: رواية، تاريخ...)"
                                value={newBook.category}
                                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="السعر *"
                                value={newBook.price}
                                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="حالة الورق (اختياري)"
                                value={newBook.HPaper}
                                onChange={(e) => setNewBook({ ...newBook, HPaper: e.target.value })}
                                className="border rounded-lg px-4 py-2"
                            />
                            <textarea
                                placeholder="وصف الكتاب (اختياري)"
                                rows="3"
                                value={newBook.description}
                                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                                className="border rounded-lg px-4 py-2 md:col-span-2"
                            />

                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">صور الكتاب (متعدد) *</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setImageFiles(e.target.files)}
                                    className="block w-full text-sm"
                                />
                                {imageFiles.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        تم اختيار {imageFiles.length} صورة
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg disabled:opacity-70"
                                >
                                    {uploading ? (
                                        <>
                                            <ClipLoader className="inline ml-2" size={20} color="#fff" /> جاري الرفع...
                                        </>
                                    ) : (
                                        "إضافة الكتاب"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* قائمة الكتب */}
                <input
                    type="text"
                    placeholder="ابحث بالعنوان أو المؤلف..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 mb-6 px-4 py-2 border rounded-lg"
                />

                {loading ? (
                    <div className="text-center py-10">
                        <ClipLoader size={50} color="#3B82F6" />
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-600 text-xl">لا توجد كتب</p>
                ) : (
                    <div className="grid gap-6">
                        {filtered.map((book) => (
                            <motion.div
                                key={book.key}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={book.title || ""}
                                        onChange={(e) => handleChange(book.key, "title", e.target.value)}
                                        className="font-bold text-lg border rounded px-3 py-1"
                                    />
                                    <input
                                        type="text"
                                        value={book.author || ""}
                                        onChange={(e) => handleChange(book.key, "author", e.target.value)}
                                        className="border rounded px-3 py-1"
                                    />
                                    <input
                                        type="text"
                                        value={book.category || ""}
                                        onChange={(e) => handleChange(book.key, "category", e.target.value)}
                                        className="border rounded px-3 py-1"
                                    />
                                    <input
                                        type="number"
                                        value={book.price || ""}
                                        onChange={(e) => handleChange(book.key, "price", e.target.value)}
                                        className="border rounded px-3 py-1"
                                    />
                                    <select
                                        value={book.status || "available"}
                                        onChange={(e) => handleChange(book.key, "status", e.target.value)}
                                        className={`border rounded px-3 py-1 ${book.status === "sold" ? "bg-red-100" : "bg-green-100"
                                            }`}
                                    >
                                        <option value="available">متاح</option>
                                        <option value="sold">تم البيع</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleSave(book)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}