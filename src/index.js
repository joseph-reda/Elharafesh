// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <FavoriteProvider>
                <App />
            </FavoriteProvider>
        </BrowserRouter>
    </React.StrictMode>
);
