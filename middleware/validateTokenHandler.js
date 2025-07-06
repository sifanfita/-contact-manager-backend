const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to validate JWT token
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized, no token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user; // Attach user payload to request object
        next(); // Proceed to the next middleware
    } catch (err) {
        res.status(401);
        throw new Error("Unauthorized, invalid token");
    }
});

module.exports = validateToken;
