// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("❌ خطأ أثناء قراءة السلة:", error);
            return [];
        }
    });

    // 💾 حفظ التغييرات في localStorage عند كل تعديل
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
            console.error("❌ خطأ أثناء حفظ السلة:", error);
        }
    }, [cart]);

    // 🛍️ إضافة كتاب للسلة
    function addToCart(book) {
        if (!book?.id) return;

        if (book.status === "sold") {
            toast.error("⚠️ هذا الكتاب غير متاح للإضافة للسلة");
            return;
        }

        setCart((prev) => {
            const exists = prev.some((b) => b.id === book.id);
            if (exists) {
                toast("ℹ️ هذا الكتاب موجود بالفعل في السلة");
                return prev;
            }

            toast.success(`🛒 تمت إضافة "${book.title}" إلى السلة`);
            return [...prev, { ...book, quantity: 1 }];
        });
    }

    // 🗑️ إزالة كتاب من السلة
    function removeFromCart(bookId) {
        setCart((prev) => prev.filter((b) => b.id !== bookId));
        toast.error("🗑️ تمت إزالة الكتاب من السلة");
    }

    // 🔢 تعديل الكمية
    function updateQuantity(bookId, qty) {
        if (qty < 1) return; // لا تسمح بأقل من 1
        setCart((prev) =>
            prev.map((b) => (b.id === bookId ? { ...b, quantity: qty } : b))
        );
    }

    // 🧹 تفريغ السلة بالكامل
    function clearCart() {
        setCart([]);
        toast("🧹 تم إفراغ السلة بنجاح");
    }

    // ✅ التحقق إذا كان الكتاب موجودًا في السلة
    function isInCart(bookId) {
        return cart.some((b) => b.id === bookId);
    }

    // 🔢 إجمالي عدد العناصر في السلة
    const totalItems = cart.reduce((sum, b) => sum + (b.quantity || 1), 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// 🧩 Hook جاهز للاستخدام في أي مكون
export function useCart() {
    return useContext(CartContext);
}
