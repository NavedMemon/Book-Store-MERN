import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust based on your backend

// Helper function to extract error messages
const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message; // Return API error message
    } else {
        return "Something went wrong. Please try again.";
    }
};

// **Register User**
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log("Register Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error(handleError(error));
    }
};

// **Login User**
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (!response.data) throw new Error("Invalid response from server");
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw new Error(handleError(error));
    }
};

// **Fetch Authenticated User Data**
export const getUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error(handleError(error));
    }
};

// **Update User Profile**
export const updateUser = async (userData, token) => {
    try {
        const response = await axios.put(`${API_URL}/me`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error(handleError(error));
    }
};

// **Delete User Account**
export const deleteUser = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error(handleError(error));
    }
};
