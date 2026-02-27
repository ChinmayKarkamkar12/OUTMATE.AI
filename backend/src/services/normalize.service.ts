export const normalizeResults = (records: any[]) => {
    return records.map((item) => ({
        type: item.type ?? (item.prospect_id ? "prospect" : "company"),

        // Core fields
        name: item.full_name ?? item.name ?? null,
        domain: item.company_website ?? item.domain ?? item.website ?? null,

        // Industry / Job Title
        industry:
            item.job_title ??
            item.industry ??
            item.naics_description ??
            item.sic_code_description ??
            null,

        // Employee count
        employee_count:
            item.employee_count ??
            item.number_of_employees_range ??
            null,

        // Revenue
        revenue:
            item.revenue ??
            item.yearly_revenue_range ??
            null,

        // Country
        country:
            item.country ??
            item.country_name ??
            null,

        // LinkedIn
        linkedin_url:
            item.linkedin ??
            item.linkedin_url ??
            item.linkedin_profile ??
            null,

        raw: item
    }));
};
