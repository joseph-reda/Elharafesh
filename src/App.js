import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Category from "./pages/Category.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchResults from "./pages/SearchResults.jsx";

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
