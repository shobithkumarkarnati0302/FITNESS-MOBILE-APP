import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/Profile.js";
import favoriteRoutes from "./routes/favorite.js";
  
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", favoriteRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log("Server is Running on port ", PORT);
  console.log("Mongo URI: ", process.env.MONGO_URI);
});
