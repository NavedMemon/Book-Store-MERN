const express = require("express");
const { check, validationResult } = require("express-validator");
const { registerUser, loginUser, deleteUser, updateUser, getAllUsers } = require("./user.controller");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();
const User = require("./user.model");
console.log("Imported Middleware:", { authMiddleware });


// Registration Route
router.post(
    "/register",
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password", "Password must be 6+ characters").isLength({ min: 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        registerUser(req, res);
    }
);

// Login Route
router.post(
    "/login",
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        loginUser(req, res);
    }
);

// Get current user data route
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password field
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//update
router.put("/me", authMiddleware, async (req, res) => {
    updateUser(req, res);
});

// delete

// ✅ Delete User by ID (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});



router.get("/", authMiddleware, getAllUsers);

module.exports = router;
