"use client";

import { EnrichmentResult } from "@/types/enrichment";
import JsonModal from "./JsonModal";
import { useState } from "react";

export default function ResultsTable({
  results
}: {
  results: EnrichmentResult[];
}) {
  const [selected, setSelected] = useState<any | null>(null);

  if (!results.length) {
    return (
      <div className="bg-white dark:bg-[#1f1f1d] border border-[#d6d3c8] dark:border-white/[0.06] rounded-2xl p-14 text-center animate-fade-in-up animate-delay-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#eef2e4] dark:bg-white/[0.04] border border-[#d8dfca] dark:border-white/[0.06] flex items-center justify-center mb-5">
          <svg className="w-7 h-7 text-[#b8c4a0] dark:text-[#6e6e5c]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#6b6b56] dark:text-[#a3a38e]">Enter a prompt to generate enriched data.</p>
        <p className="text-xs text-[#9a9a82] dark:text-[#6e6e5c] mt-1.5">Results will appear here once your query is processed.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-[#1f1f1d] rounded-2xl shadow-lg shadow-[#d6d3c8]/40 dark:shadow-black/20 border border-[#d6d3c8] dark:border-white/[0.06] overflow-hidden animate-fade-in-up animate-delay-2">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#d6d3c8]/60 dark:border-white/[0.06]">
          <h2 className="text-sm font-semibold text-[#2c2c1e] dark:text-[#e8e8df]">
            Enrichment Results
            <span className="ml-2.5 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             bg-[#eef2e4] dark:bg-[#4a5d23]/[0.12]
                             text-[#4a5d23] dark:text-[#8fa857]
                             border border-[#d8dfca] dark:border-[#4a5d23]/20">
              {results.length}
            </span>
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f0eee8]/60 dark:bg-white/[0.02] sticky top-0 z-10">
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider text-right">Employees</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider text-right">Revenue</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider">Country</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider">LinkedIn</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-[#6b6b56] dark:text-[#6e6e5c] uppercase tracking-wider">JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d6d3c8]/40 dark:divide-white/[0.04]">
              {results.map((r, i) => (
                <tr
                  key={i}
                  className={`transition-colors duration-150 ease-in-out hover:bg-[#eef2e4]/50 dark:hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-[#f6f5f0]/50 dark:bg-white/[0.01]" : ""
                    }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#2c2c1e] dark:text-[#e8e8df] whitespace-nowrap">{r.name}</td>
                  <td className="px-6 py-4 text-sm text-[#6b6b56] dark:text-[#a3a38e]">{r.industry || "–"}</td>
                  <td className="px-6 py-4 text-sm text-[#6b6b56] dark:text-[#a3a38e] text-right tabular-nums">{r.employee_count || "–"}</td>
                  <td className="px-6 py-4 text-sm text-[#6b6b56] dark:text-[#a3a38e] text-right tabular-nums">{r.revenue || "–"}</td>
                  <td className="px-6 py-4 text-sm text-[#6b6b56] dark:text-[#a3a38e]">{r.country || "–"}</td>
                  <td className="px-6 py-4">
                    {r.linkedin_url ? (
                      <a
                        href={r.linkedin_url}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#4a5d23] dark:text-[#8fa857] hover:text-[#3d4e1c] dark:hover:text-[#a3bf6a] transition-colors duration-150"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84" />
                        </svg>
                        View
                      </a>
                    ) : (
                      <span className="text-sm text-[#d6d3c8] dark:text-[#6e6e5c]">–</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelected(r.raw)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium
                                 text-[#6b6b56] dark:text-[#6e6e5c]
                                 hover:text-[#4a5d23] dark:hover:text-[#8fa857]
                                 border border-[#d6d3c8] dark:border-white/[0.08]
                                 hover:border-[#b8c4a0] dark:hover:border-[#4a5d23]/25
                                 hover:bg-[#eef2e4] dark:hover:bg-[#4a5d23]/[0.08]
                                 px-3 py-1.5 rounded-lg
                                 hover:scale-[1.02] active:scale-[0.98]
                                 transition-[transform,background-color,border-color,color] duration-150 ease-in-out cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                      </svg>
                      JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <JsonModal data={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}