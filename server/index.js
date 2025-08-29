import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Card from "./card-model.js";

// connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB error:", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === API routes ===
app.get("/",  (req, res) => {
  try {
    res.send("It's working!!")
  } catch (err) {
    console.error("cannot find home", err);
    res.status(500).json({ error: "Cannot get card" });
  }
});

// 取得卡片
app.get("/api/:card_id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.card_id).lean();
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (err) {
    console.error("Error in getting card", err);
    res.status(500).json({ error: "Cannot get card" });
  }
});

// 新增卡片
app.post("/api", async (req, res) => {
  try {
    const { to, message, from} = req.body;
    const newMessage = new Card({ to, message, from });
    await newMessage.save();

    res.status(201).json({
      success: true,
      id: newMessage._id,
      message: "成功上傳訊息!"
    });
  } catch (err) {
    console.error("Error in posting card", err);
    res.status(400).json({ error: "Failed to save card" });
  }
});

// listen (for local dev only, Vercel 不會用到這個)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
