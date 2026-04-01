import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST Toggle Favorite (Add or Remove)
router.post("/toggle", authMiddleware, async (req, res) => {
  try {
    const exercise = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingIndex = user.favorites.findIndex(
      (fav) => fav.name === exercise.name,
    );

    if (existingIndex !== -1) {
      user.favorites.splice(existingIndex, 1);
    } else {
      user.favorites.push(exercise);
    }

    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET Favorites
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
