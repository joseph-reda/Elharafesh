// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ استيراد الـ CartProvider

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>  {/* ✅ لف التطبيق كله بالـ CartProvider */}
                <App />
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>
);
