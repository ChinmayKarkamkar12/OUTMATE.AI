export default function JsonModal({
  data,
  onClose
}: {
  data: any;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/25 dark:bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6 animate-backdrop-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-[#1f1f1d] w-full max-w-2xl rounded-2xl shadow-2xl shadow-[#9a9a82]/20 dark:shadow-black/40 overflow-hidden animate-modal-in border border-[#d6d3c8] dark:border-white/[0.06]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d6d3c8]/60 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#eef2e4] dark:bg-[#4a5d23]/10 border border-[#d8dfca] dark:border-[#4a5d23]/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#4a5d23] dark:text-[#8fa857]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-[#2c2c1e] dark:text-[#e8e8df]">Raw JSON</h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                       text-[#9a9a82] dark:text-[#6e6e5c] hover:text-[#2c2c1e] dark:hover:text-[#e8e8df]
                       hover:bg-[#f0eee8] dark:hover:bg-white/[0.06]
                       active:scale-95
                       transition-[transform,background-color,color] duration-150 ease-in-out cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Code Block */}
        <div className="p-6 max-h-[70vh] overflow-auto">
          <pre className="text-xs leading-relaxed text-[#2c2c1e] dark:text-[#a3a38e] bg-[#f6f5f0] dark:bg-black/20 border border-[#d6d3c8]/60 dark:border-white/[0.04] rounded-xl p-5 overflow-auto font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}