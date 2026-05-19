const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER

router.post("/register", async (req, res) => {

    try {

        console.log(req.body);

        const {
            name,
            email,
            password
        } = req.body;

        // Check existing user

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                error: "User already exists"
            });

        }

        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create new user

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            message:
                "User registered successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Find user

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                error: "Invalid email"

            });

        }

        // Compare passwords

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({

                error: "Invalid password"

            });

        }

        // Generate token

        const token = jwt.sign(

            {
                id: user._id
            },

            "secretkey",

            {
                expiresIn: "1d"
            }

        );

        res.json({

            message: "Login successful",

            token

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

});

module.exports = router;