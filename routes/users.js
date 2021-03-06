const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register Handle
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    //Check password match
    if (password != password2) {
        errors.push({ msg: "Password do not match" });
    }
    // Check pass length
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation passed
        // res.send('pass')
        User.findOne({ email: email }).then(user => {
            if (user) {
                // User exists
                errors.push({ msg: "Email is already exists" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    passowrd
                });
                console.log("New  User Console: " + newUser);
                res.send("hello new user");
            }
        });
    }

    /*console.log(req.body)
                            res.send('hello')*/
});

module.exports = router;