import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust based on your backend

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log("Register Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);

        if (response.data) {
            return response.data; // Ensure only data is returned
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};


// Fetch User Data (Authenticated)
export const getUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Update User
export const updateUser = async (userData, token) => {
    try {
        const response = await axios.put(`${API_URL}/me`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Delete User
export const deleteUser = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
