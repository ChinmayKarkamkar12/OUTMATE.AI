export const normalizeResults = (records: any[]) => {
    return records.map((item) => ({
        type: item.type || "company",

        // Core fields
        name: item.name || null,
        domain: item.domain || item.website || null,

        // Map industry — handle both mock (industry) and real API (naics_description)
        industry: item.industry || item.naics_description || item.sic_code_description || null,

        // Map employee count — handle both mock (employee_count) and real API (number_of_employees_range)
        employee_count: item.employee_count || item.number_of_employees_range || null,

        // Map revenue — handle both mock (revenue) and real API (yearly_revenue_range)
        revenue: item.revenue || item.yearly_revenue_range || null,

        // Map country — handle both mock (country) and real API (country_name)
        country: item.country || item.country_name || null,

        // LinkedIn profile — handle both mock (linkedin_url) and real API (linkedin_profile)
        linkedin_url: item.linkedin_url || item.linkedin_profile || null,

        // Raw object preserved
        raw: item
    }));
};