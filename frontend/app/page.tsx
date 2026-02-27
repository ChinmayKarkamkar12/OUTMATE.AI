"use client";

import { useState } from "react";
import PromptBox from "@/components/PromptBox";
import SamplePrompts from "@/components/SamplePrompts";
import ResultsTable from "@/components/ResultsTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";
import ThemeToggle from "@/components/ThemeToggle";
import { enrichPrompt } from "@/services/api";
import { EnrichmentResult } from "@/types/enrichment";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<EnrichmentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnrich = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrichPrompt(prompt);
      setResults(data.results || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Soft olive glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#b8c4a0]/30 dark:bg-[#4a5d23]/[0.06] rounded-full blur-[100px] animate-glow-pulse" />
        </div>

        {/* Theme toggle */}
        <div className="absolute top-5 right-6 z-20">
          <ThemeToggle />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 sm:pt-28 sm:pb-18 text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
                          bg-[#eef2e4] dark:bg-[#4a5d23]/[0.12]
                          text-[#4a5d23] dark:text-[#8fa857]
                          border border-[#d8dfca] dark:border-[#4a5d23]/20
                          mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a5d23] dark:bg-[#8fa857] animate-pulse" />
            Max 3 enriched rows per request
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2c2c1e] dark:text-[#e8e8df]">
            OutMate{" "}
            <span className="bg-gradient-to-r from-[#4a5d23] via-[#5a7028] to-[#748a4a] dark:from-[#8fa857] dark:via-[#a3bf6a] dark:to-[#b8c4a0] bg-clip-text text-transparent">
              – NLP Enrichment Demo
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-lg sm:text-xl text-[#6b6b56] dark:text-[#a3a38e] max-w-2xl mx-auto leading-relaxed">
            Turn natural language into enriched B2B intelligence.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#b8c4a0]/50 dark:via-[#4a5d23]/20 to-transparent" />
      </section>

      {/* ── Main Content ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Prompt Card */}
        <div className="bg-white dark:bg-[#1f1f1d] rounded-2xl border border-[#d6d3c8] dark:border-white/[0.06] shadow-lg shadow-[#d6d3c8]/40 dark:shadow-black/20 p-6 sm:p-8 animate-fade-in-up animate-delay-1">
          <PromptBox
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleEnrich}
            loading={loading}
          />

          <div className="mt-6">
            <p className="text-xs font-medium text-[#9a9a82] dark:text-[#6e6e5c] uppercase tracking-wider mb-3">
              Try a sample prompt
            </p>
            <SamplePrompts onSelect={setPrompt} />
          </div>
        </div>

        {/* States */}
        {loading && <LoadingSpinner />}
        {error && <ErrorBanner message={error} />}

        {!loading && !error && (
          <ResultsTable results={results} />
        )}
      </div>
    </main>
  );
}
