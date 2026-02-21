import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    error: "Too many requests. Please try again later.",
  },
});