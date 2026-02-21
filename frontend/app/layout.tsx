import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OutMate – NLP Enrichment Demo",
  description:
    "Turn natural language into enriched B2B intelligence. Powered by AI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Apply stored theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-[#f6f5f0] dark:bg-[#151514] text-[#2c2c1e] dark:text-[#e8e8df] min-h-screen antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
