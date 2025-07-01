const Register = require('../models/User');
const { getToken } = require("../middleware/token");
const { encrypt, decrypt } = require("../middleware/password");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userRole = role ? role.toLowerCase() : "user";
        if (!["user", "admin"].includes(userRole)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "User already registered with this email" });
        }

        const hashedPassword = await encrypt(password);
        const newUser = await Register.create({
            name,
            email,
            password: hashedPassword,
            role: userRole,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                type: "Login",
                message: "Email or phone number and password are required",
            });
        }

        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await decrypt(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = getToken(user);

        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            token: token,
            role: user.role,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { registerUser, loginUser }; 
