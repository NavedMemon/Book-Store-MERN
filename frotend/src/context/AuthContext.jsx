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
            
            const token = response?.token || response?.data?.token;
            if (!token) throw new Error("Invalid response from login API");

            localStorage.setItem("token", token);

            // Fetch user details using the token
            const user = await getUserData(token);
            setCurrentUser(user);
            return user; // Return user data for handling redirects
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // **Register function**
    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            console.log("Register API Response:", response);
            return response; // Return response for handling navigation in Register.jsx
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
