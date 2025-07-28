import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

export default function App() {
    return (
        <div dir="rtl" className="font-sans">
            <Navbar />

            <main className="p-4 min-h-[80vh]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/category/:name" element={<Category />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
