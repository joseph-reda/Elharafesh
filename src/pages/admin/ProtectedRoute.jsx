// ✅ src/pages/admin/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    // ✅ التحقق من localStorage أو sessionStorage
    const isAdmin =
        localStorage.getItem("isAdmin") === "true" ||
        sessionStorage.getItem("isAdmin") === "true";

    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/admin/home" state={{ from: location }} replace />;
    }

    return children;
}
