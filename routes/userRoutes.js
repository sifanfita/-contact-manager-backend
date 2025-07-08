const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const authorizeRole = require("../middleware/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);
router.get("/admin", validateToken, authorizeRole("admin"), (req, res) => {
    console.log(req.user)
    res.status(200).json({ message: "Welcome to the admin area" });
});


module.exports = router;