// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // حفظ البيانات في localStorage عند التحديث
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // إضافة كتاب للسلة
    function addToCart(book) {
        if (!book?.id) return;

        if (book.status === "sold") {
            toast.error("⚠️ هذا الكتاب غير متاح للإضافة للسلة");
            return;
        }

        setCart((prev) => {
            if (!prev.some((b) => b.id === book.id)) {
                toast.success(`🛒 تمت إضافة "${book.title}" إلى السلة`);
                return [...prev, { ...book, quantity: 1 }];
            } else {
                toast("⚠️ هذا الكتاب موجود بالفعل في السلة", { icon: "ℹ️" });
                return prev;
            }
        });
    }

    // إزالة كتاب من السلة
    function removeFromCart(bookId) {
        setCart((prev) => prev.filter((b) => b.id !== bookId));
        toast.error("🗑️ تمت إزالة الكتاب من السلة");
    }

    // تعديل الكمية
    function updateQuantity(bookId, qty) {
        if (qty < 1) return;
        setCart((prev) =>
            prev.map((b) =>
                b.id === bookId ? { ...b, quantity: qty } : b
            )
        );
    }

    // تفريغ السلة
    function clearCart() {
        setCart([]);
        toast("🧹 تم إفراغ السلة");
    }

    // التحقق إذا الكتاب موجود في السلة ✅
    function isInCart(bookId) {
        return cart.some((b) => b.id === bookId);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Hook جاهز للاستخدام
function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };
