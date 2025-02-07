
import { loginUser, registerUser, getUserData } from "../redux/features/users/usersApi";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage when app starts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserData(token)
                .then((user) => {
                    setCurrentUser(user);
                })
                .catch(() => {
                    localStorage.removeItem("token"); // Remove invalid token
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = async (userData) => {
        try {
            const response = await loginUser(userData);
            console.log("Login API Response:", response); // Debugging
    
            // Directly access response.token instead of response.data.token
            if (response && response.token) {
                const token = response.token;
                localStorage.setItem("token", token);
    
                // Fetch user details using the token
                const user = await getUserData(token);
                setCurrentUser(user);
            } else {
                throw new Error("Invalid response from login API");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    
    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
