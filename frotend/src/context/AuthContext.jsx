import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserData } from "../redux/features/users/usersApi";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate(); // For navigation

    // Login User
    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials); // API call to login
            const token = res.data.token;

            if (token) {
                localStorage.setItem("token", token); // Store token in localStorage
                setToken(token); // Update state immediately

                // Fetch user data immediately after login
                const userData = await getUserData(token);
                setCurrentUser(userData); // Update state to trigger re-render
                setLoading(false); // Set loading to false once data is fetched

                // Navigate to the home page after successful login
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Logout User
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setCurrentUser(null);
        setLoading(false); // Set loading to false immediately after logout
        navigate("/login"); // Redirect to login page after logout
    };

    // Fetch user data when component mounts
    useEffect(() => {
        if (token) {
            getUserData(token)
                .then((userData) => {
                    setCurrentUser(userData);
                    setLoading(false); // Set loading to false once data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    logout();
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const value = {
        currentUser,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
