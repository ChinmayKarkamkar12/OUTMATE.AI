import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import enrichRoutes from "./routes/enrich.routes";
import { apiRateLimiter } from "./middlewares/rateLimiter";


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

// 🔥 Apply rate limiter BEFORE routes
app.use("/api", apiRateLimiter);

app.use("/api", healthRoutes);
app.use("/api/enrich", enrichRoutes);

export default app;
import { errorHandler } from "./middlewares/errorHandler";

app.use(errorHandler);