// src/context/FavoriteContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error("❌ خطأ أثناء قراءة المفضلة:", err);
            return [];
        }
    });

    // تحديث localStorage مع أي تغيير
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // إضافة كتاب
    function addFavorite(book) {
        if (!book?.id) return;

        setFavorites((prev) => {
            if (prev.some((b) => b.id === book.id)) {
                toast("⚠️ هذا الكتاب موجود بالفعل في المفضلة", { icon: "ℹ️" });
                return prev;
            }
            toast.success(`❤️ تمت إضافة "${book.title}" إلى المفضلة`);
            return [...prev, book];
        });
    }

    // إزالة كتاب
    function removeFavorite(bookId) {
        setFavorites((prev) => {
            const updated = prev.filter((b) => b.id !== bookId);
            if (updated.length !== prev.length) {
                toast.error("🗑️ تمت إزالة الكتاب من المفضلة");
            }
            return updated;
        });
    }

    // تحقق إذا الكتاب موجود
    const isFavorite = (bookId) => favorites.some((b) => b.id === bookId);

    return (
        <FavoriteContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoriteContext);
}
