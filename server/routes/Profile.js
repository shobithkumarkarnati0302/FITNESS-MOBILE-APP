import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT Update Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, height, weight, age, gender, plan } = req.body;
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name         = name;
    user.height       = height;
    user.weight       = weight;
    user.age          = age;
    user.gender       = gender;
    user.plan         = plan;
    user.lastModified = Date.now();
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
