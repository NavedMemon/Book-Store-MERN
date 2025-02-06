import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust based on your backend

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log('Register Response:', response); // Log the response to the console
        return response;
    } catch (error) {
        console.error('Error registering user:', error); // Log any error that occurs
        throw error;
    }
};


// Login User

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log('Login Response:', response);  // Log the response to check if the token is being sent back

        // Assuming the response contains a token, save it in localStorage
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);  // Save token in localStorage
            console.log('Token saved in localStorage:', response.data.token);
        }

        return response;
    } catch (error) {
        console.error('Error logging in:', error);  // Log any error that occurs
        throw error;
    }
};

// Get User Details
export const getUser = async (token) => {
    return await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Update User
export const updateUser = async (userData, token) => {
    return await axios.put(`${API_URL}/me`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Delete User
export const deleteUser = async (token) => {
    return await axios.delete(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Add getUserData to fetch user details by token
export const getUserData = async (token) => {
    try {
        console.log('Fetching user data with token:', token);  // Log token to verify it's being passed correctly
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User data from getUserData:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Propagate error to useEffect
    }
};


