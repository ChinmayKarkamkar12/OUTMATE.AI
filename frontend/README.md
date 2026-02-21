# 🎨 OutMate – Frontend

> A modern, responsive SaaS-style interface built with **Next.js 14**, **React 18**, and **Tailwind CSS v4** for the OutMate NLP Enrichment platform.

---

## ✨ Features

- 🌗 **Dark / Light theme** – toggle with localStorage persistence
- 📝 **Natural language prompt input** – with real-time character feedback
- ⚡ **Sample prompts** – one-click examples to get started instantly
- 📊 **Interactive results table** – displays enriched B2B data
- 🔍 **JSON drill-down modal** – inspect raw API response per record
- 💫 **Micro-animations** – fade-ins, glow pulses, and smooth transitions
- 📱 **Fully responsive** – optimized for desktop, tablet, and mobile

---

## 📁 Folder Structure

```
frontend/
├── app/
│   ├── page.tsx            # Main page (prompt input + results display)
│   ├── layout.tsx          # Root layout (fonts, metadata, theme class)
│   └── globals.css         # Global styles, dark mode, animations
│
├── components/
│   ├── PromptBox.tsx       # Text input + "Enrich" submit button
│   ├── SamplePrompts.tsx   # Clickable sample prompt chips
│   ├── ResultsTable.tsx    # Table display for enrichment results
│   ├── JsonModal.tsx       # Modal to view raw JSON per result
│   ├── LoadingSpinner.tsx  # Loading state animation
│   ├── ErrorBanner.tsx     # Error message display
│   └── ThemeToggle.tsx     # Dark/Light mode toggle with persistence
│
├── services/
│   └── api.ts              # Axios client – POST /api/enrich
│
├── types/
│   └── enrichment.ts       # TypeScript interfaces (EnrichmentResult, EnrichmentResponse)
│
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind v4 config with custom theme
├── postcss.config.js       # PostCSS + Tailwind plugin
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript config
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable               | Required | Description                                  |
| ---------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | No       | Backend API URL (default: `http://localhost:5000`) |

### 3. Start Development Server

```bash
npm run dev
```

The app will be running at **http://localhost:3000**.

### 4. Production Build

```bash
npm run build
npm start
```

---

## 🧩 Component Breakdown

### `PromptBox`
Text area for entering natural-language B2B search prompts. Includes an "Enrich" button that triggers the API call. Shows a loading state while the request is in progress.

### `SamplePrompts`
Pre-defined prompt chips that users can click to auto-fill the prompt box. Examples include searches for SaaS companies, marketing directors, fintech startups, etc.

### `ResultsTable`
Displays enriched results in a clean table format with columns for **Name**, **Domain**, **Industry**, **Revenue**, **Employees**, **Country**, and **LinkedIn**. Each row has a "View JSON" button for raw data inspection.

### `JsonModal`
A modal overlay that renders the full raw JSON response for a selected result. Useful for developers to inspect the complete Explorium API response.

### `ThemeToggle`
A sun/moon icon toggle that switches between light and dark mode. The preference is persisted in `localStorage` and applied via a `dark` class on the root `<html>` element.

### `LoadingSpinner`
Animated spinner shown while waiting for the backend API response.

### `ErrorBanner`
Displays user-friendly error messages when the API call fails or returns an error.

---

## 🎨 Design System

### Color Palette

| Token                | Light Mode    | Dark Mode      | Usage              |
| -------------------- | ------------- | -------------- | ------------------ |
| Primary              | `#4a5d23`     | `#8fa857`      | Buttons, accents   |
| Primary Gradient     | `#4a5d23 → #748a4a` | `#8fa857 → #b8c4a0` | Headings  |
| Background           | `#f7f6f0`     | `#161614`      | Page background    |
| Surface              | `#ffffff`     | `#1f1f1d`      | Cards, containers  |
| Text Primary         | `#2c2c1e`     | `#e8e8df`      | Headings           |
| Text Secondary       | `#6b6b56`     | `#a3a38e`      | Body text          |
| Border               | `#d6d3c8`     | `white/6%`     | Dividers, borders  |

### Typography
- **Font:** System defaults + Tailwind's sans stack
- **Headings:** `text-4xl` to `text-6xl`, `font-extrabold`, `tracking-tight`
- **Body:** `text-lg` to `text-xl`, `leading-relaxed`

### Animations
- `animate-fade-in-up` – content entrance animation
- `animate-glow-pulse` – soft hero background glow
- `animate-pulse` – status indicator pulse

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS v4, PostCSS
- **HTTP Client:** Axios
- **Language:** TypeScript 5
- **Linting:** ESLint with next/core-web-vitals
