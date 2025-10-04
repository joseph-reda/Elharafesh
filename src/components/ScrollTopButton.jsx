// src/components/ScrollToTopButton.jsx
import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <FiArrowUp className="text-xl" />
            </button>
        )
    );
}
