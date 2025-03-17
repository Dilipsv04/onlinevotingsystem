const express = require("express");
const EmployeeModel = require("../models/Employee");
const router = express.Router();

// Login route
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("the password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.status(500).json("Error occurred during login"));
});

// Registration route
router.post("/register", (req, res) => {
    const { name, email, password, faceData } = req.body; // Add faceData to destructuring

    // Validate required fields
    if (!name || !email || !password || !faceData) {
        return res.status(400).json({ error: "All fields (name, email, password, faceData) are required" });
    }

    // Insert into MongoDB
    EmployeeModel.create({ name, email, password, faceData })
        .then(user => res.json(user))
        .catch(err => {
            console.error("MongoDB insertion error:", err);
            res.status(400).json({ error: "Registration error", details: err.message });
        });
});
module.exports = router;