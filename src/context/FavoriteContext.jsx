import { createContext, useContext, useEffect, useState } from "react";

// إنشاء السياق
const FavoriteContext = createContext();

// مزود السياق
export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addFavorite(book) {
        setFavorites((prev) => {
            if (!prev.includes(book.id)) {
                return [...prev, book.id];
            }
            return prev;
        });
    }


    function removeFavorite(bookId) {
        setFavorites((prev) => prev.filter((id) => id !== bookId));
    }

    function isFavorite(bookId) {
        return favorites.includes(bookId);
    }

    return (
        <FavoriteContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}

// هوك مخصص للوصول إلى السياق
export function useFavorites() {
    return useContext(FavoriteContext);
}
