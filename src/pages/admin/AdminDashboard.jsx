import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [transl, setTransl] = useState("");
    const [type, setType] = useState("عربي");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [HPaper, setHPaper] = useState("");
    const [description, setDescription] = useState("");
    const [folder, setFolder] = useState(""); // مجلد الصور داخل public/images
    const [images, setImages] = useState([]); // روابط الصور
    const [loading, setLoading] = useState(false);

    // ✅ عند اختيار الصور
    const handleImageSelect = (files) => {
        if (!folder.trim()) {
            toast.error("⚠️ يرجى كتابة اسم المجلد داخل public/images أولاً (مثل 10-30)");
            return;
        }

        const urls = Array.from(files).map(
            (file) => `/images/${folder}/${file.name}`
        );
        setImages(urls);
        toast.success(`✅ تم اختيار ${urls.length} صورة`);
    };

    // ✅ عند الإرسال
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !category || images.length === 0) {
            toast.error("⚠️ يرجى ملء جميع الحقول الأساسية وتحميل الصور!");
            return;
        }

        setLoading(true);

        const newBook = {
            id: Date.now(),
            title,
            author,
            transl,
            type,
            category,
            price: price || "غير محدد",
            HPaper: HPaper || "",
            description: description || "",
            images,
            isNew: true,
            status: "available",
            createdAt: Date.now(),
        };

        try {
            await push(ref(db, "books"), newBook);
            toast.success("📚 تم إضافة الكتاب بنجاح!");

            // إعادة تعيين الحقول
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
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
            <Toaster />
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-center text-blue-700 mb-6"
            >
                📘 لوحة إدارة الكتب
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* 📚 بيانات الكتاب */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="عنوان الكتاب"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        placeholder="اسم المؤلف"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="المترجم (اختياري)"
                    value={transl}
                    onChange={(e) => setTransl(e.target.value)}
                    className="w-full p-3 border rounded-md"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="p-3 border rounded-md"
                    >
                        <option value="عربي">عربي</option>
                        <option value="عالمي">عالمي</option>
                    </select>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border rounded-md"
                        required
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
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="السعر (اختياري)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-3 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="عدد الصفحات (اختياري)"
                        value={HPaper}
                        onChange={(e) => setHPaper(e.target.value)}
                        className="p-3 border rounded-md"
                    />
                </div>

                <textarea
                    placeholder="الوصف (اختياري)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded-md h-28"
                />

                {/* 📁 اختيار المجلد */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        📁 اسم مجلد الصور (داخل public/images)
                    </label>
                    <input
                        type="text"
                        placeholder="مثال: 10-30"
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                {/* 🖼️ رفع الصور */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        📷 اختر صور الكتاب (يمكنك اختيار أكثر من صورة)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageSelect(e.target.files)}
                        className="w-full p-3 border rounded-md bg-gray-50"
                    />
                </div>

                {/* 🖼️ عرض الصور المختارة */}
                {images.length > 0 && (
                    <div className="border rounded-lg p-3 bg-gray-50">
                        <p className="font-semibold text-gray-700 mb-2">
                            الصور المختارة ({images.length})
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                            {images.map((url, idx) => (
                                <div
                                    key={idx}
                                    className="relative group border rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={url}
                                        alt={`img-${idx}`}
                                        className="w-full h-24 object-cover"
                                    />
                                    <span className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-medium">
                                        {idx + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* زر الإضافة */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
                >
                    {loading ? "⏳ جاري الإضافة..." : "➕ إضافة الكتاب"}
                </button>
            </form>
        </div>
    );
}
