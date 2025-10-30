// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";

// Pages (Public)
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Category from "./pages/Category.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchResults from "./pages/SearchResults.jsx";

// Pages (Admin)
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./pages/admin/ProtectedRoute.jsx";

export default function App() {
    return (
        <div
            className="font-sans bg-gray-50 min-h-screen flex flex-col"
            dir="rtl"
        >
            {/* ✅ عرض Navbar و SearchBar فقط في الصفحات العامة */}
            <Routes>
                {/* 🧩 صفحات الإدارة */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* 🏠 الصفحات العامة */}
                <Route
                    path="*"
                    element={
                        <>
                            {/* شريط التنقل */}
                            <Navbar />

                            {/* شريط البحث */}
                            <div className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
                                <SearchBar />
                            </div>

                            {/* المحتوى الرئيسي */}
                            <main className="flex-1 p-4">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/book/:id"
                                        element={<BookDetails />}
                                    />
                                    <Route
                                        path="/category"
                                        element={<Category />}
                                    />
                                    <Route
                                        path="/category/:name"
                                        element={<Category />}
                                    />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route
                                        path="/contact"
                                        element={<Contact />}
                                    />
                                    <Route
                                        path="/search"
                                        element={<SearchResults />}
                                    />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>

                            {/* الفوتر */}
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}
