// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [transl, setTransl] = useState("");
    const [type, setType] = useState("عربي");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [HPaper, setHPaper] = useState("");
    const [description, setDescription] = useState("");
    const [folder, setFolder] = useState(""); // اسم مجلد اليوم داخل public/images
    const [images, setImages] = useState([]); // روابط الصور النهائية
    const [loading, setLoading] = useState(false);

    // عند اختيار الصور من الجهاز
    const handleImageSelect = (files) => {
        if (!folder.trim()) {
            toast.error("⚠️ يرجى كتابة اسم المجلد داخل public/images أولاً (مثل 10-30)");
            return;
        }

        const urls = Array.from(files).map((file) => `/images/${folder}/${file.name}`);
        setImages(urls);
        toast.success(`✅ تم اختيار ${urls.length} صورة`);
    };

    // عند الإرسال
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !category || images.length === 0) {
            toast.error("⚠️ يرجى ملء جميع الحقول الأساسية وتحميل الصور!");
            return;
        }

        setLoading(true);

        const newBook = {
            id: Date.now(),
            isNew: true,
            title,
            author,
            transl,
            type,
            category,
            images, // /images/10-30/name.jpg
            price: price || "غير محدد",
            HPaper: HPaper || "",
            description: description || "",
            status: "available",
            createdAt: Date.now(),
        };

        try {
            await push(ref(db, "books"), newBook);
            toast.success("📚 تم إضافة الكتاب بنجاح إلى قاعدة البيانات!");
            // إعادة التهيئة
            setTitle("");
            setAuthor("");
            setTransl("");
            setType("عربي");
            setCategory("");
            setPrice("");
            setHPaper("");
            setDescription("");
            setImages([]);
            setFolder("");
        } catch (err) {
            toast.error("❌ حدث خطأ أثناء الإضافة: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <Toaster />
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">📘 لوحة إدارة الكتب</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* اسم مجلد الصور */}
                <div>
                    <label className="block text-sm font-medium mb-1">📁 اسم مجلد الصور (داخل public/images)</label>
                    <input
                        type="text"
                        placeholder="مثال: 10-30"
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        أدخل اسم المجلد الذي يحتوي على الصور مثل <code>10-30</code>
                    </p>
                </div>

                {/* بيانات الكتاب */}
                <input
                    type="text"
                    placeholder="عنوان الكتاب"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="text"
                    placeholder="اسم المؤلف"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="text"
                    placeholder="المترجم (اختياري)"
                    value={transl}
                    onChange={(e) => setTransl(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-3 border rounded-md"
                >
                    <option value="عربي">عربي</option>
                    <option value="عالمي">عالمي</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border rounded-md"
                >
                    <option value="">اختر الفئة</option>
                    <option value="رواية">رواية</option>
                    <option value="مسرحية">مسرحية</option>
                    <option value="شعر">شعر</option>
                    <option value="سيرة ذاتية">سيرة ذاتية</option>
                    <option value="تاريخ">تاريخ</option>
                    <option value="علم نفس">علم نفس</option>
                    <option value="فلسفة">فلسفة</option>
                    <option value="سياسة">سياسة</option>
                </select>

                <input
                    type="text"
                    placeholder="السعر (اختياري)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="text"
                    placeholder="عدد الصفحات (اختياري)"
                    value={HPaper}
                    onChange={(e) => setHPaper(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />
                <textarea
                    placeholder="الوصف (اختياري)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded-md"
                    rows="4"
                ></textarea>

                {/* اختيار الصور */}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageSelect(e.target.files)}
                    className="w-full p-3 border rounded-md bg-gray-50"
                />

                {/* عرض الصور المختارة */}
                {images.length > 0 && (
                    <div className="p-3 bg-gray-50 border rounded-md">
                        <p className="font-semibold text-sm mb-2">الصور التي سيتم حفظها:</p>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            {images.map((url, idx) => (
                                <li key={idx}>{url}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {loading && <p className="text-blue-600 text-sm">⏳ جاري الإضافة...</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "جاري الإضافة..." : "إضافة الكتاب"}
                </button>
            </form>
        </div>
    );
}
