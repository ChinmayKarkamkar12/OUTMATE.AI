import axios from "axios";
import { StructuredFilters } from "../types/filters";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class GeminiRateLimitError extends Error {
  constructor() {
    super("GEMINI_RATE_LIMIT");
  }
}

export class GeminiResponseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const callGemini = async (
  prompt: string,
  retries: number = 1 // keep low for free tier
): Promise<StructuredFilters> => {
  const fullPrompt = `
You are converting B2B sales prompts into structured JSON filters for the Explorium API.

Rules:
- Always return valid JSON only. No explanation. No markdown. No text outside JSON.
- Decide whether entity_type is "company" or "prospect".
- For company searches, use these filter fields (all optional):
  - "linkedin_category": array of industry names as they appear on LinkedIn. Use lowercase.
  - "country_code": array of lowercase ISO 2-letter country codes.
  - "company_size": array of size bucket strings.
  - "website_keywords": array of keyword strings relevant to the business.
- For prospect searches, use:
  - "country_code"
  - "job_level"
  - "job_department"
  - "company_size"
  - "linkedin_category"
- Only include clearly relevant filters.
- Convert country names to ISO 2-letter codes.

Output Format:
{
  "entity_type": "company" | "prospect",
  "filters": { ... }
}

User Prompt:
${prompt}
`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY,
          },
          timeout: 10000,
        }
      );

      const textOutput =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textOutput) {
        throw new GeminiResponseError("Empty response from Gemini");
      }

      // Clean markdown formatting if present
      const cleaned = textOutput
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsed: StructuredFilters;

      try {
        parsed = JSON.parse(cleaned);

        // Handle double-stringified JSON
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
      } catch {
        throw new GeminiResponseError("Invalid JSON returned by Gemini");
      }

      return parsed;

    } catch (error: any) {
      const status = error.response?.status;

      // Handle rate limiting
      if (status === 429) {
        if (attempt < retries) {
          const waitTime = 2000; // simple fixed delay for free tier
          console.warn(
            `Gemini rate limited (429). Retrying in ${waitTime / 1000}s...`
          );
          await sleep(waitTime);
          continue;
        }
        throw new GeminiRateLimitError();
      }

      // Handle other API errors
      console.error("Gemini API Error:", {
        status,
        message: error.message,
      });

      throw new GeminiResponseError("Gemini API call failed");
    }
  }

  throw new GeminiResponseError("Gemini failed after retries");
};