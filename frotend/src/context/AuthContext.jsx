import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUserData } from "../redux/features/users/usersApi"; // Make sure this API is from your backend

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token from localStorage

    // Login User
    const login = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            console.log("Login response:", response); // Log the response
            const token = response.data.token; // Make sure token is in the response
            if (token) {
                localStorage.setItem("token", token); // Store token in localStorage
                console.log("Token saved to localStorage:", token); // Log to ensure token is saved
            }
            return response;
        } catch (error) {
            console.error("Error logging in:", error); // Log any error
            throw error;
        }
    };
    

    // Logout User
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        setToken(null);
        setCurrentUser(null); // Reset currentUser
    };

    // Fetch user data based on token on component mount
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token");
        console.log('Token retrieved from localStorage:', tokenFromLocalStorage);  // Log token
    
        if (tokenFromLocalStorage) {
            setToken(tokenFromLocalStorage); // Set token in state if exists
        } else {
            console.log("No token found in localStorage.");
            setLoading(false); // No token, stop loading
        }
    }, []);
    

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
    
        if (tokenFromStorage) {
            console.log("Token retrieved from localStorage:", tokenFromStorage);
    
            // If token exists, fetch user data
            getUserData(tokenFromStorage)
                .then((userData) => {
                    setCurrentUser(userData); // Set user data from token
                    setLoading(false); // Finish loading
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    logout(); // Log the user out if fetching user data fails
                });
        } else {
            console.log("No token found in localStorage.");
            setLoading(false); // No token, stop loading
        }
    }, []); // Empty dependency array means this runs once when the component is mounted
    

    const value = {
        currentUser,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
