export const normalizeResults = (records: any[]) => {
    return records.map((item) => ({
        type: "company",

        // Core fields
        name: item.name || null,
        domain: item.domain || item.website || null,

        // Map industry from NAICS description
        industry: item.naics_description || item.sic_code_description || null,

        // Map employee range
        employee_count: item.number_of_employees_range || null,

        // Map revenue range
        revenue: item.yearly_revenue_range || null,

        // Map country
        country: item.country_name || null,

        // LinkedIn profile
        linkedin_url: item.linkedin_profile || null,

        // Raw object preserved
        raw: item
    }));
};