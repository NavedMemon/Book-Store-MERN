const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

module.exports = mongoose.model("User", UserSchema);
