"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const isDark = stored === "dark";
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl
                 bg-[#eef2e4] dark:bg-white/[0.07]
                 border border-[#d6d3c8] dark:border-white/[0.08]
                 text-[#6b6b56] dark:text-[#a3a38e]
                 hover:bg-[#d8dfca] dark:hover:bg-white/[0.1]
                 hover:text-[#3d4e1c] dark:hover:text-[#e8e8df]
                 hover:scale-105 active:scale-95
                 transition-[transform,background-color,border-color,color] duration-200 ease-in-out cursor-pointer"
        >
            {dark ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            )}
        </button>
    );
}
