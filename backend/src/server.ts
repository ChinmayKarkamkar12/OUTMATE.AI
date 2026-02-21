import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ ADD THIS LINE
app.use(express.json());

app.use(cors());

// Health route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Enrich route
app.post("/api/enrich", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.json({ message: "Prompt received", prompt });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});