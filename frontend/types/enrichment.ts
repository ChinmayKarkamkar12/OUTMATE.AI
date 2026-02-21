export interface EnrichmentResult {
    type: string | null;
    name: string | null;
    domain: string | null;
    industry: string | null;
    revenue: string | null;
    employee_count: number | null;
    country: string | null;
    linkedin_url: string | null;
    raw: any;
}

export interface EnrichmentResponse {
    results: EnrichmentResult[];
}
