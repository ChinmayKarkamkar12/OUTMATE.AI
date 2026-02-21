/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                olive: {
                    50: '#f7f7f0',
                    100: '#eef2e4',
                    200: '#d8dfca',
                    300: '#b8c4a0',
                    400: '#93a56e',
                    500: '#748a4a',
                    600: '#4a5d23',
                    700: '#3d4e1c',
                    800: '#2f3c16',
                    900: '#1e2710',
                    950: '#141a0b',
                },
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out both',
                'bounce-dot': 'bounceDot 1.4s infinite ease-in-out both',
                'modal-in': 'modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
                'glow-pulse': 'glowPulse 4s ease-in-out infinite',
                'slide-down': 'slideDown 0.35s ease-out both',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceDot: {
                    '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.4' },
                    '40%': { transform: 'scale(1)', opacity: '1' },
                },
                modalIn: {
                    '0%': { opacity: '0', transform: 'scale(0.96) translateY(6px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.25' },
                    '50%': { opacity: '0.45' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
