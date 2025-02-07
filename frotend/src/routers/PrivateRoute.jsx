import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth(); // Get loading state

    // Show a loading indicator while authentication is being checked
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is authenticated, allow access to the page
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
