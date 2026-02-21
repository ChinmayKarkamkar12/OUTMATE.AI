import { Request, Response, NextFunction } from "express";
import { callGemini } from "../services/gemini.service";
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

    // 1️⃣ Convert natural language → structured filters
    const structuredFilters = await callGemini(prompt);
    console.log("GEMINI OUTPUT:", JSON.stringify(structuredFilters, null, 2));

    // 2️⃣ Fetch enriched data (mock or real)
    const results = await fetchFromExplorium(
      structuredFilters.entity_type,
      structuredFilters.filters
    );

    // 🔍 Debug: log only first result to inspect field mapping
    if (results && results.length > 0) {
      console.log(
        "RAW EXPLORIUM FIRST RESULT:",
        JSON.stringify(results[0], null, 2)
      );
    } else {
      console.log("RAW EXPLORIUM RESPONSE: No results returned");
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
    next(error); // Let global error handler handle it
  }
};