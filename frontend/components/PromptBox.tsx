interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function PromptBox({
  value,
  onChange,
  onSubmit,
  loading
}: Props) {
  return (
    <div className="space-y-5">
      <label className="block text-sm font-semibold text-[#4a5d23] dark:text-[#8fa857]">
        Your Prompt
      </label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Find 3 SaaS companies in the US with 50–500 employees..."
        className="w-full p-5 bg-[#f6f5f0] dark:bg-white/[0.03] border border-[#d6d3c8] dark:border-white/[0.08] rounded-xl
                   text-sm text-[#2c2c1e] dark:text-[#e8e8df] placeholder:text-[#9a9a82] dark:placeholder:text-[#6e6e5c]
                   focus:outline-none focus:ring-2 focus:ring-[#4a5d23]/25 dark:focus:ring-[#8fa857]/30 focus:border-[#4a5d23]/50 dark:focus:border-[#8fa857]/40
                   transition-[border-color,box-shadow] duration-200 ease-in-out resize-none leading-relaxed"
      />

      <button
        onClick={onSubmit}
        disabled={!value || loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3
                   bg-[#4a5d23] dark:bg-[#4a5d23]
                   hover:bg-[#3d4e1c] dark:hover:bg-[#5a7028]
                   text-white text-sm font-semibold rounded-xl
                   shadow-md shadow-[#4a5d23]/20 dark:shadow-[#4a5d23]/15
                   hover:shadow-lg hover:shadow-[#4a5d23]/25
                   hover:-translate-y-[1px]
                   active:scale-[0.98] active:shadow-sm
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 disabled:scale-100
                   transition-[transform,box-shadow,background-color,opacity] duration-200 ease-in-out cursor-pointer"
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {loading ? "Enriching..." : "Search & Enrich"}
      </button>
    </div>
  );
}