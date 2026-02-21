export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 p-5
                    bg-red-50 dark:bg-red-500/[0.06]
                    border border-red-200 dark:border-red-500/[0.15]
                    border-l-4 border-l-red-500 dark:border-l-red-400
                    rounded-xl animate-slide-down">
      <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-red-800 dark:text-red-300">Something went wrong</p>
        <p className="text-sm text-red-600 dark:text-red-400/80 mt-0.5">{message}</p>
      </div>
    </div>
  );
}