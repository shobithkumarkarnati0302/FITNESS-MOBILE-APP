import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing. Check Content-Type header.",
      });
    }
    const { name, email, password, height, weight, age, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      height,
      weight,
      age,
      gender,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // console.log("User created:", user);
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        name,
        email,
        height,
        weight,
        age,
        gender,
        plan
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing. Check Content-Type header.",
      });
    }
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Verify password first
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in response for frontend
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        height: existingUser.height,
        weight: existingUser.weight,
        age: existingUser.age,
        gender: existingUser.gender,
        plan: existingUser.plan,
        subscriptionStartDate: existingUser.subscriptionStartDate,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
