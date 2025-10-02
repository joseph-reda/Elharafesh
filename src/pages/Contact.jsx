// src/pages/Contact.jsx
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    const contacts = [
        {
            icon: <FaWhatsapp className="text-green-600 text-2xl" />,
            label: "واتساب",
            value: "01212145165",
            link: "https://wa.me/201212145165",
            color: "from-green-500 to-green-600",
        },
        {
            icon: <FaFacebook className="text-blue-600 text-2xl" />,
            label: "فيسبوك",
            value: "/harafesh.books",
            link: "https://www.facebook.com/share/1ACxYSibvC/",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: <FaMapMarkerAlt className="text-red-500 text-2xl" />,
            label: "العنوان",
            value: "شارع التحرير، وسط البلد، القاهرة",
            color: "from-red-500 to-red-600",
        },
        {
            icon: <FaEnvelope className="text-gray-600 text-2xl" />,
            label: "البريد الإلكتروني",
            value: "nehrugamal@gmail.com",
            link: "mailto:nehrugamal@gmail.com",
            color: "from-gray-500 to-gray-600",
        },
    ];

    return (
        <main className="max-w-4xl mx-auto px-4 py-12 text-right font-sans space-y-10">
            {/* العنوان */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl font-extrabold text-blue-800 mb-4">📞 تواصل معنا</h1>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
                    نحن هنا للإجابة على جميع استفساراتك ومساعدتك في أي وقت. اختر وسيلة التواصل المفضلة لديك 👇
                </p>
            </motion.div>

            {/* بطاقات التواصل */}
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
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
                    >
                        {/* أيقونة بدائرة */}
                        <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} shadow-md`}
                        >
                            {item.icon}
                        </div>

                        {/* النص */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">{item.label}</p>
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
                                <p className="font-semibold text-gray-800 text-lg">{item.value}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}
