const samples = [
  "Find 3 fast-growing SaaS companies in the US with 50-500 employees, raising Series B or later.",
  "Give me 3 VPs of Sales in European fintech startups with more than 100 employees.",
  "Top AI infrastructure companies hiring machine learning engineers in India.",
  "3 marketing leaders at e-commerce brands in North America doing more than $50M in revenue.",
  "Cybersecurity firms with increasing web traffic and at least 200 employees."
];

export default function SamplePrompts({
  onSelect
}: {
  onSelect: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {samples.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          title={s}
          className="group inline-flex items-center gap-1.5 text-xs font-medium
                     bg-[#f0eee8] dark:bg-white/[0.04]
                     hover:bg-[#eef2e4] dark:hover:bg-[#4a5d23]/[0.1]
                     text-[#6b6b56] dark:text-[#a3a38e]
                     hover:text-[#4a5d23] dark:hover:text-[#8fa857]
                     border border-[#d6d3c8] dark:border-white/[0.06]
                     hover:border-[#b8c4a0] dark:hover:border-[#4a5d23]/25
                     px-3.5 py-1.5 rounded-full
                     hover:scale-[1.03]
                     active:scale-[0.98]
                     transition-[transform,background-color,border-color,color] duration-150 ease-in-out cursor-pointer"
        >
          <span className="text-[#9a9a82] dark:text-[#6e6e5c] group-hover:text-[#4a5d23] dark:group-hover:text-[#8fa857] transition-colors duration-150">✦</span>
          <span className="max-w-[180px] sm:max-w-[240px] truncate">{s}</span>
        </button>
      ))}
    </div>
  );
}