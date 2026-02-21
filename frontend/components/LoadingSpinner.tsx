export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a5d23] dark:bg-[#8fa857] animate-bounce-dot" style={{ animationDelay: '0s' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a5d23] dark:bg-[#8fa857] animate-bounce-dot" style={{ animationDelay: '0.16s' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4a5d23] dark:bg-[#8fa857] animate-bounce-dot" style={{ animationDelay: '0.32s' }} />
      </div>
      <p className="text-sm text-[#9a9a82] dark:text-[#6e6e5c] font-medium">Enriching your results…</p>
    </div>
  );
}