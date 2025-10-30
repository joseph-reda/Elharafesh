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
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ الصور محلية فقط (من مجلد public/images/books)
    const handleLocalImages = (files) => {
        const selectedImages = [];
        const previews = [];

        for (const file of files) {
            const localPath = `/images/${file.name}`;
            selectedImages.push(localPath);
            previews.push(URL.createObjectURL(file));
        }

        setImages(selectedImages);
        setPreview(previews);
        toast.success("✅ تم تحديد الصور بنجاح!");
    };

    // ✅ الحفظ في Firebase Realtime Database
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !category || images.length === 0) {
            toast.error("⚠️ يرجى ملء جميع الحقول وتحميل الصور!");
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
            images, // 🔹 روابط الصور المحلية
            price: price || "غير محدد",
            HPaper: HPaper || "",
            description: description || "",
            status: "available",
        };

        try {
            await push(ref(db, "books"), newBook);
            toast.success("📚 تم إضافة الكتاب بنجاح إلى Firebase!");
            // 🔹 تفريغ الحقول بعد الإضافة
            setTitle("");
            setAuthor("");
            setTransl("");
            setType("عربي");
            setCategory("");
            setPrice("");
            setHPaper("");
            setDescription("");
            setImages([]);
            setPreview([]);
        } catch (err) {
            toast.error("❌ حدث خطأ أثناء الإضافة: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <Toaster />
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                📘 لوحة إدارة الكتب
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <option value="تاريخ">تاريخ</option>
                    <option value="مسرحية">مسرحية</option>
                    <option value="سير ذاتية">سير ذاتية</option>
                    <option value="شعر">شعر</option>
                    <option value="فلسفة">فلسفة</option>
                    <option value="علم نفس">علم نفس</option>
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

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleLocalImages(e.target.files)}
                    className="w-full p-3 border rounded-md bg-gray-50"
                />

                {preview.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                        {preview.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`Preview ${i}`}
                                className="w-24 h-24 object-cover rounded-md border"
                            />
                        ))}
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
