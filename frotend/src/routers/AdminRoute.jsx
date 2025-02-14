import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Directly get token from localStorage
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const adminEmail = "admin@gmail.com"; // Admin Email

  // ✅ Check if token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Decode token (if using JWT) or fetch from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored in localStorage

  // ✅ Redirect non-admin users
  if (!user || user.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
