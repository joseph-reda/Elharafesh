// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ استيراد الـ Provider

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <CartProvider> {/* ✅ لف App بالـ CartProvider */}
                    <App />
                </CartProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
