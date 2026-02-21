export type EntityType = "company" | "prospect";

/**
 * Filters supported for company searches
 */
export interface CompanyFilters {
    linkedin_category?: string[];
    country_code?: string[];
    company_size?: string[];
    website_keywords?: string[];
}

/**
 * Filters supported for prospect searches
 */
export interface ProspectFilters {
    country_code?: string[];
    job_level?: string[];
    job_department?: string[];
    company_size?: string[];
    linkedin_category?: string[];
}

/**
 * Structured response expected from Gemini
 */
export interface StructuredFilters {
    entity_type: EntityType;
    filters: CompanyFilters | ProspectFilters;
}

