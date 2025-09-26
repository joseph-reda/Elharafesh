// src/App.js
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import Category from "./pages/Category";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// (اختياري) صفحة عرض نتائج البحث
import SearchResults from "./pages/SearchResults";

export default function App() {
    return (
        <div dir="rtl" className="font-sans bg-gray-50 min-h-screen flex flex-col">
            {/* شريط التنقل */}
            <Navbar />

            {/* المحتوى الرئيسي */}
            <main className="flex-1 p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/category/:name" element={<Category />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* صفحة البحث */}
                    <Route path="/search" element={<SearchResults />} />

                    {/* أي رابط غير معروف */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {/* الفوتر */}
            <Footer />
        </div>
    );
}
