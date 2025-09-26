// src/pages/Contact.jsx
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    const contacts = [
        {
            icon: <FaWhatsapp className="text-green-600 text-xl" />,
            label: "رقم الواتساب",
            value: "01212145165",
            link: "https://wa.me/201212145165",
        },
        {
            icon: <FaFacebook className="text-blue-600 text-xl" />,
            label: "فيسبوك",
            value: "/harafesh.books",
            link: "https://www.facebook.com/share/1ACxYSibvC/",
        },
        {
            icon: <FaMapMarkerAlt className="text-red-500 text-xl" />,
            label: "العنوان",
            value: "شارع التحرير، وسط البلد، القاهرة",
        },
        {
            icon: <FaEnvelope className="text-gray-600 text-xl" />,
            label: "البريد الإلكتروني",
            value: "nehrugamal@gmail.com",
            link: "mailto:nehrugamal@gmail.com",
        },
    ];

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-right space-y-8 font-sans">
            {/* العنوان */}
            <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-blue-800"
            >
                📞 تواصل معنا
            </motion.h1>

            {/* الوصف */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-700 text-lg leading-relaxed"
            >
                نحن هنا للإجابة على جميع استفساراتك، لا تتردد في التواصل معنا عبر الوسائل التالية:
            </motion.p>

            {/* طرق التواصل */}
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
                className="space-y-5 text-gray-800 text-lg"
            >
                {contacts.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        {item.icon}
                        <div>
                            <span className="font-bold">{item.label}:</span>{" "}
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <span>{item.value}</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}
