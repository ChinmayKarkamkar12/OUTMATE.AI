import { Request, Response, NextFunction } from "express";
import { callGemini, GeminiRateLimitError } from "../services/gemini.service";
import { fetchFromExplorium } from "../services/explorium.service";
import { normalizeResults } from "../services/normalize.service";
import { logEnrichmentRequest } from "../utils/logger";

export const enrichHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        message: "Prompt is required",
        error_code: "INVALID_PROMPT"
      });
    }

    let structuredFilters;

    // 1️⃣ Convert natural language → structured filters
    try {
      structuredFilters = await callGemini(prompt);
      console.log("GEMINI OUTPUT:", JSON.stringify(structuredFilters, null, 2));
    } catch (error: any) {
      if (error instanceof GeminiRateLimitError) {
        return res.status(429).json({
          message: "Gemini rate limit exceeded. Please try again shortly.",
          error_code: "GEMINI_RATE_LIMIT"
        });
      }

      return res.status(500).json({
        message: "Failed to process prompt using Gemini.",
        error_code: "GEMINI_ERROR"
      });
    }

    // 2️⃣ Fetch enriched data (mock or real)
    const results = await fetchFromExplorium(
      structuredFilters.entity_type,
      structuredFilters.filters
    );

    if (results && results.length > 0) {
      console.log(
        "RAW EXPLORIUM FIRST RESULT:",
        JSON.stringify(results[0], null, 2)
      );
    }

    // 3️⃣ Normalize data format
    const normalized = normalizeResults(results);

    // 4️⃣ Structured logging (required by assignment)
    logEnrichmentRequest({
      prompt,
      entityType: structuredFilters.entity_type,
      resultCount: normalized.length
    });

    // 5️⃣ Return final response
    return res.status(200).json({
      results: normalized
    });

  } catch (error) {
    next(error);
  }
};