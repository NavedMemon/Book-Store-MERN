const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const extractedToken = token.split(" ")[1]; // Extract the token part
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

        req.user = { id: decoded.id };  // Attach only the user ID to request

        next();  // Proceed to next middleware or route
    } catch (err) {
        console.error("Auth Middleware Error:", err.message);
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = authMiddleware;
