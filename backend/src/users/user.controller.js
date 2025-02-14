const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

// Register User
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
       return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ email, password: hashedPassword });
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        // Find user by ID and delete
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateUser = async (req, res) => {
    const { email, password } = req.body; // Get new values from request body

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update fields only if new values are provided
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save(); // Save updated user

        res.status(200).json({ msg: "User updated successfully", user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUsers
};
