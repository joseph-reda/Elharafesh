import { useState, useEffect } from "react";
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
    const [loading, setLoading] = useState(false);
    const [folderName, setFolderName] = useState("");

    // 🔹 توليد اسم المجلد تلقائيًا بالتاريخ الحالي
    useEffect(() => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        setFolderName(`${month}-${day}`);
    }, []);

    // 🔹 التعامل مع الصور المحلية فقط (بدون رفع)
    const handleImageSelection = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const paths = files.map((file) => `/images/${folderName}/${file.name}`);
        setImages(paths);
        toast.success(`✅ تم تحديد ${files.length} صورة (${folderName}) بنجاح`);
    };

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
            images,
            price: price || "غير محدد",
            HPaper: HPaper || "",
            description: description || "",
            status: "available",
        };

        try {
            await push(ref(db, "books"), newBook);
            toast.success("📚 تم إضافة الكتاب بنجاح إلى قاعدة البيانات!");
            setTitle("");
            setAuthor("");
            setTransl("");
            setType("عربي");
            setCategory("");
            setPrice("");
            setHPaper("");
            setDescription("");
            setImages([]);
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
                <p className="text-sm text-gray-600">
                    🗂️ مجلد الصور الحالي:{" "}
                    <span className="font-semibold text-blue-600">{folderName}</span>
                </p>

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
                    <option value="سيرة ذاتية">سيرة ذاتية</option>
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
                    onChange={handleImageSelection}
                    className="w-full p-3 border rounded-md bg-gray-50"
                />

                {images.length > 0 && (
                    <div className="mt-3">
                        <h3 className="text-sm text-gray-700 mb-1">📸 الصور المحددة:</h3>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                            {images.map((img, i) => (
                                <li key={i}>{img}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {loading && <p className="text-blue-600 text-sm">⏳ جاري الحفظ...</p>}

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
