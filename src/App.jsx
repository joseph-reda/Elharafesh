// src/App.jsx
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// مكونات عامة
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ScrollToTopButton from "./components/ScrollTopButton.jsx";

// صفحات الإدارة
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ManageBooks from "./pages/admin/ManageBooks.jsx";
import ProtectedRoute from "./pages/admin/ProtectedRoute.jsx";

// الصفحات العامة (Lazy loading)
const Home = lazy(() => import("./pages/Home.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const BookDetails = lazy(() => import("./pages/BookDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const SearchResults = lazy(() => import("./pages/SearchResults.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Scroll to top عند تغيير الصفحة
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);
    return null;
};

export default function App() {
    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col" dir="rtl">
            <ScrollToTop />

            <Routes>
                {/* صفحات الإدارة */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/manage-books"
                    element={
                        <ProtectedRoute>
                            <ManageBooks />
                        </ProtectedRoute>
                    }
                />

                {/* باقي الموقع */}
                <Route
                    path="*"
                    element={
                        <>
                            <Navbar />
                            <div className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 sticky top-0 z-40">
                                <SearchBar />
                            </div>

                            <main className="flex-1">
                                <Suspense
                                    fallback={
                                        <div className="min-h-screen flex items-center justify-center bg-gray-50">
                                            <div className="text-center">
                                                <ClipLoader size={70} color="#4F46E5" />
                                                <p className="mt-6 text-xl text-gray-600">جاري التحميل...</p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/book/:id" element={<BookDetails />} />
                                        <Route path="/category" element={<Category />} />
                                        <Route path="/category/:name" element={<Category />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/search" element={<SearchResults />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </main>

                            <Footer />
                            <ScrollToTopButton />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}