// src/components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
    const contacts = [
        {
            label: "واتساب",
            value: "01034345458",
            link: "https://wa.me/2001034345458",
            icon: "📞",
            color: "text-green-600",
        },
        {
            label: "فيسبوك",
            value: "harafesh.books",
            link: "https://www.facebook.com/share/1ACxYSibvC/",
            icon: "📘",
            color: "text-blue-600",
        },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 text-right p-4 mt-10 text-sm text-gray-600 border-t"
        >
            <div className="max-w-5xl mx-auto space-y-3">
                {/* الحقوق */}
                <p>
                    &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمكتبة
                    الحرافيش للكتب
                </p>

                {/* وسائل التواصل */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6">
                    {contacts.map((item, idx) => (
                        <p key={idx} className="flex items-center gap-1">
                            <span>{item.icon}</span>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${item.color} hover:underline`}
                            >
                                {item.value}
                            </a>
                        </p>
                    ))}
                </div>
            </div>
        </motion.footer>
    );
}
