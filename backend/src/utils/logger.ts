export const logEnrichmentRequest = ({
    prompt,
    entityType,
    resultCount
}: {
    prompt: string;
    entityType: string;
    resultCount: number;
}) => {
    console.log("========== ENRICHMENT LOG ==========");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Prompt Length:", prompt.length);
    console.log("Entity Type:", entityType);
    console.log("Results Returned:", resultCount);
    console.log("====================================");
};

