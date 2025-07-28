import React from "react";

export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-right">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">📞 تواصل معنا</h1>

            <p className="text-gray-700 mb-8">
                نحن هنا للإجابة على جميع استفساراتك، لا تتردد في التواصل معنا عبر الوسائل التالية:
            </p>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                    📱 <span className="font-bold">رقم الواتساب:</span>{" "}
                    <a href="https://wa.me/201287666728" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        01287666728
                    </a>
                </p>

                <p>
                    📘 <span className="font-bold">فيسبوك:</span>{" "}
                    <a href="https://www.facebook.com/harafesh.books" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        /harafesh.books
                    </a>
                </p>

                <p>
                    📍 <span className="font-bold">العنوان:</span> شارع التحرير، وسط البلد، القاهرة
                </p>

                <p>
                    📧 <span className="font-bold">البريد الإلكتروني:</span>{" "}
                    <a href="mailto:info@harafeshbooks.com" className="text-blue-600 hover:underline">
                        info@harafeshbooks.com
                    </a>
                </p>
            </div>
        </div>
    );
}
