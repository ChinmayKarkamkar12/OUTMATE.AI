import axios from "axios";
import {
    EntityType,
    CompanyFilters,
    ProspectFilters
} from "../types/filters";

const EXPLORIUM_API_KEY = process.env.EXPLORIUM_API_KEY;
const USE_MOCK = process.env.USE_EXPLORIUM_MOCK !== "false";

if (!EXPLORIUM_API_KEY && !USE_MOCK) {
    throw new Error("EXPLORIUM_API_KEY is not defined");
}

/**
 * Wraps each filter array in Explorium's { values: [...] } format.
 * Gemini outputs plain arrays; Explorium expects:
 * { field_name: { values: [...] } }
 */
const wrapFilterValues = (
    filters: CompanyFilters | ProspectFilters
) => {
    const wrapped: Record<string, { values: string[] }> = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
            wrapped[key] = { values: value };
        }
    });

    return wrapped;
};

export const fetchFromExplorium = async (
    entityType: EntityType,
    filters: CompanyFilters | ProspectFilters
) => {
    try {
        // 🔒 MOCK MODE
        if (USE_MOCK) {
            console.log("Using Explorium MOCK mode");

            const mockData = [
                {
                    type: entityType,
                    name: "Acme SaaS Inc",
                    domain: "acmesaas.com",
                    industry: "Software",
                    revenue: "25M",
                    employee_count: 50,
                    country: "United States",
                    linkedin_url: "https://linkedin.com/company/acmesaas",
                    raw: { mock: true }
                },
                {
                    type: entityType,
                    name: "CloudNova",
                    domain: "cloudnova.io",
                    industry: "Software",
                    revenue: "40M",
                    employee_count: 75,
                    country: "United States",
                    linkedin_url: "https://linkedin.com/company/cloudnova",
                    raw: { mock: true }
                },
                {
                    type: entityType,
                    name: "NextGen Platforms",
                    domain: "nextgenplatforms.ai",
                    industry: "AI",
                    revenue: "60M",
                    employee_count: 120,
                    country: "United States",
                    linkedin_url: "https://linkedin.com/company/nextgenplatforms",
                    raw: { mock: true }
                }
            ];

            return mockData.slice(0, 3);
        }

        // 🔥 REAL API MODE
        console.log("Calling Explorium REAL API");

        const endpoint =
            entityType === "company"
                ? "https://api.explorium.ai/v1/businesses"
                : "https://api.explorium.ai/v1/prospects";

        const exploriumFilters = wrapFilterValues(filters);

        const requestBody = {
            filters: exploriumFilters,
            mode: "full",
            size: 3,
            page_size: 3,
            page: 1
        };

        console.log("Explorium endpoint:", endpoint);
        console.log(
            "Explorium request body:",
            JSON.stringify(requestBody, null, 2)
        );

        const response = await axios.post(endpoint, requestBody, {
            headers: {
                "Content-Type": "application/json",
                api_key: EXPLORIUM_API_KEY // Explorium header format
            }
        });

        const results = response.data?.data || [];

        console.log(`Explorium returned ${results.length} results`);

        // 🔒 Enforce max 3 results (assignment requirement)
        return results.slice(0, 3);

    } catch (error: any) {
        console.error("====== EXPLORIUM ERROR ======");
        console.error("Status:", error.response?.status);
        console.error(
            "Data:",
            JSON.stringify(error.response?.data, null, 2)
        );
        console.error("Message:", error.message);
        console.error("=============================");
        throw new Error("Explorium API failed");
    }
};