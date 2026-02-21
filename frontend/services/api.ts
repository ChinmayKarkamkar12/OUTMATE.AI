import axios from "axios";
import { EnrichmentResponse } from "@/types/enrichment";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const enrichPrompt = async (prompt: string): Promise<EnrichmentResponse> => {
    const response = await axios.post<EnrichmentResponse>(
        `${API_BASE}/api/enrich`,
        { prompt }
    );
    return response.data;
};
