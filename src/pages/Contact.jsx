// ✅ src/pages/Contact.jsx
import { motion } from "framer-motion";
import {
    FaWhatsapp,
    FaFacebook,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
    const contacts = [
        {
            icon: <FaWhatsapp className="text-white text-2xl" />,
            label: "واتساب",
            value: "01034345458",
            link: "https://wa.me/201034345458",
            color: "from-green-500 to-green-600",
        },
        {
            icon: <FaFacebook className="text-white text-2xl" />,
            label: "فيسبوك",
            value: "/harafesh.books",
            link: "https://www.facebook.com/share/1ACxYSibvC/",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: <FaMapMarkerAlt className="text-white text-2xl" />,
            label: "العنوان",
            value: "شارع التحرير، وسط البلد، القاهرة",
            color: "from-red-500 to-red-600",
        },
        {
            icon: <FaEnvelope className="text-white text-2xl" />,
            label: "البريد الإلكتروني",
            value: "alhrafyshllktb@gmail.com",
            link: "mailto:alhrafyshllktb@gmail.com",
            color: "from-gray-500 to-gray-600",
        },
    ];

    return (
        <main className="max-w-5xl mx-auto px-4 py-16 text-right font-sans space-y-12">
            {/* 🧭 العنوان الرئيسي */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
                    📞 تواصل معنا
                </h1>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
                    نحن هنا للإجابة على جميع استفساراتك ومساعدتك في أي وقت. اختر وسيلة
                    التواصل المفضلة لديك 👇
                </p>
            </motion.div>

            {/* 💬 بطاقات التواصل */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
                {contacts.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="flex items-center gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 transition-all duration-300"
                    >
                        {/* 🎯 الأيقونة داخل دائرة ملونة */}
                        <div
                            className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${item.color} shadow-md`}
                        >
                            {item.icon}
                        </div>

                        {/* 📄 المعلومات */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 font-semibold hover:underline text-lg"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="font-semibold text-gray-800 text-lg">
                                    {item.value}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* 🗺️ خريطة الموقع (اختياري مستقبلاً) */}
            {/* <div className="rounded-2xl overflow-hidden shadow-lg mt-12">
                <iframe
                    title="موقعنا"
                    src="https://www.google.com/maps/embed?...your-location..."
                    className="w-full h-80 border-0"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div> */}
        </main>
    );
}
