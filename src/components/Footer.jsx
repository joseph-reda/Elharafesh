// 📘 src/components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
    const contacts = [
        {
            label: "واتساب",
            value: "01034345458",
            link: "https://wa.me/2001034345458",
            icon: "💬",
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
            className="bg-gradient-to-t from-gray-100 to-white border-t border-gray-200 mt-16 py-6 text-sm text-gray-600"
        >
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-right">
                {/* الحقوق */}
                <p className="text-gray-500">
                    &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمكتبة{" "}
                    <span className="font-semibold text-gray-800">
                        الحرافيش للكتب المستعملة
                    </span>
                    .
                </p>

                {/* وسائل التواصل */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                    {contacts.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 hover:underline ${item.color} transition-colors duration-300`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.value}</span>
                        </a>
                    ))}
                </div>
            </div>
        </motion.footer>
    );
}
