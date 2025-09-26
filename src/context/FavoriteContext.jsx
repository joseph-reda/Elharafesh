// src/context/FavoriteContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// إنشاء الـ Context
const FavoriteContext = createContext();

// مزود المفضلة
export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error("خطأ في قراءة المفضلة من localStorage:", err);
            return [];
        }
    });

    // تحديث localStorage عند أي تعديل
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // إضافة كتاب إلى المفضلة
    function addFavorite(book) {
        if (!book?.id) return;

        setFavorites((prev) => {
            if (!prev.some((b) => b.id === book.id)) {
                toast.success(`❤️ تمت إضافة "${book.title}" إلى المفضلة`);
                return [...prev, book];
            } else {
                toast("⚠️ هذا الكتاب موجود بالفعل في المفضلة", { icon: "ℹ️" });
            }
            return prev;
        });
    }

    // إزالة كتاب من المفضلة
    function removeFavorite(bookId) {
        setFavorites((prev) => {
            const updated = prev.filter((b) => b.id !== bookId);
            if (updated.length !== prev.length) {
                toast.error("🗑️ تمت إزالة الكتاب من المفضلة");
            }
            return updated;
        });
    }

    // التحقق إذا كان الكتاب موجود
    function isFavorite(bookId) {
        return favorites.some((b) => b.id === bookId);
    }

    return (
        <FavoriteContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}

// Hook لاستخدام المفضلة بسهولة
export function useFavorites() {
    return useContext(FavoriteContext);
}
