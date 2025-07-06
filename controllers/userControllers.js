const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) { 
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    // Logic for user registration (e.g., saving to database)
    const userAvailable = await User.findOne({email})
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword)
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });
    console.log("user created:", user);
    if (user) {
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
        });
        return;
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    
    
})

//@desc login a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    // Logic for user login
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401);
        throw new Error("Invalid credentials");

    }
    const accessToken = jwt.sign(
        {
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        accessToken});

});

//@desc Get current user info
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    // Logic for getting current user
    res.status(200).json(req.user);
})
    // Logic for getting current user

module.exports = {
    registerUser, loginUser, currentUser}