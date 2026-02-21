import axios from "axios";
import { StructuredFilters } from "../types/filters";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

export const callGemini = async (
  prompt: string
): Promise<StructuredFilters> => {
  try {
    const fullPrompt = `
You are converting B2B sales prompts into structured JSON filters for the Explorium API.

Rules:
- Always return valid JSON only. No explanation. No markdown. No text outside JSON.
- Decide whether entity_type is "company" or "prospect".
- For company searches, use these filter fields (all optional):
  - "linkedin_category": array of industry names as they appear on LinkedIn, e.g. ["software development", "financial services"]. Use lowercase.
  - "country_code": array of lowercase ISO 2-letter country codes, e.g. ["us", "ca", "gb", "de", "in"].
  - "company_size": array of size bucket strings. Valid values: "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10001+".
  - "website_keywords": array of keyword strings relevant to the business, e.g. ["sustainability", "machine learning"].
- For prospect searches, use these filter fields (all optional):
  - "country_code": same as above.
  - "job_level": array of job levels, e.g. ["director", "manager", "vp", "c-level"].
  - "job_department": array of departments, e.g. ["engineering", "sales", "marketing"].
  - "company_size": same as above.
  - "linkedin_category": same as above.
- Only include filters that are clearly mentioned or implied by the user's prompt. Omit fields that are not relevant.
- Convert full country names to ISO 2-letter codes (United States -> "us", United Kingdom -> "gb", Germany -> "de", India -> "in", Canada -> "ca", etc.).

Output Format:
{
  "entity_type": "company" | "prospect",
  "filters": { ... only relevant filter fields ... }
}

User Prompt:
${prompt}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: fullPrompt }],
          },
        ],
      }
    );

    const textOutput =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      throw new Error("Empty Gemini response");
    }

    // Remove possible markdown formatting
    let cleaned = textOutput
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
    } catch (parseError) {
      console.error("Failed to parse Gemini output:", cleaned);
      throw new Error("Invalid JSON returned by Gemini");
    }

    return parsed as StructuredFilters;

  } catch (error: any) {
    console.error("========== GEMINI ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    console.error("==================================");
    throw error; // Do NOT replace with new Error
  }
};