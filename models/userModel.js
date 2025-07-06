const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userame is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);