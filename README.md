# 🧠 OutMate – NLP Enrichment Demo

> Turn natural-language B2B sales prompts into enriched company & prospect intelligence — powered by **Gemini AI** and the **Explorium API**.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_14-000?logo=nextdotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000?logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwindcss&logoColor=white)

---

## ✨ What It Does

1. **You type a prompt** in plain English — e.g. _"Find mid-size SaaS companies in the US"_.
2. **Gemini AI** parses the prompt into structured API filters (industry, country, company size, etc.).
3. **Explorium API** fetches matching companies or prospects.
4. **Results are normalized** and displayed in a clean, interactive table with raw JSON drill-down.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Frontend                         │
│          Next.js 14 (App Router) + Tailwind v4       │
│  PromptBox → SamplePrompts → ResultsTable → JSON    │
└──────────────────┬───────────────────────────────────┘
                   │  POST /api/enrich  { prompt }
                   ▼
┌──────────────────────────────────────────────────────┐
│                     Backend                          │
│              Express 5 + TypeScript                  │
│                                                      │
│  1. Gemini Service   → parse prompt into filters     │
│  2. Explorium Service → fetch company/prospect data  │
│  3. Normalize Service → standardize response fields  │
└──────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
outmate-nlp-enrichment/
├── backend/                # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Gemini, Explorium, Normalize
│   │   ├── middlewares/     # Rate limiter, error handler, validation
│   │   ├── routes/         # /api/enrich, /api/health
│   │   ├── types/          # TypeScript interfaces (filters)
│   │   ├── utils/          # Helper utilities
│   │   ├── config/         # Environment config
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Entry point
│   ├── .env                # API keys (not committed)
│   └── package.json
│
├── frontend/               # Next.js 14 + Tailwind v4
│   ├── app/
│   │   ├── page.tsx        # Main page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles + dark mode
│   ├── components/         # UI components
│   │   ├── PromptBox.tsx
│   │   ├── SamplePrompts.tsx
│   │   ├── ResultsTable.tsx
│   │   ├── JsonModal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBanner.tsx
│   │   └── ThemeToggle.tsx
│   ├── services/api.ts     # Axios API client
│   ├── types/enrichment.ts # TypeScript interfaces
│   └── package.json
│
├── .gitignore
└── README.md               # ← You are here
```

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| **Frontend** | Next.js 14 (App Router), React 18, Tailwind CSS v4, TypeScript |
| **Backend**  | Express 5, TypeScript, Axios                    |
| **AI/NLP**   | Google Gemini 2.5 Flash (prompt → structured JSON) |
| **Data**     | Explorium API (B2B company & prospect enrichment) |
| **Tooling**  | ts-node-dev (hot reload), ESLint, PostCSS       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)
- **API Keys:**
  - [Google Gemini API Key](https://aistudio.google.com/app/apikey)
  - [Explorium API Key](https://www.explorium.ai/) _(optional — mock mode available)_

### 1. Clone the Repository

```bash
git clone https://github.com/ChinmayKarkamkar12/OUTMATE.AI.git
cd OUTMATE.AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
EXPLORIUM_API_KEY=your_explorium_api_key_here
USE_EXPLORIUM_MOCK=true                        # Set to "false" to use real Explorium API
FRONTEND_URL=http://localhost:3000
```

Start the backend dev server:

```bash
npm run dev
```

The API will be running at **http://localhost:5000**.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be running at **http://localhost:3000**.

---

## 🔌 API Endpoints

| Method | Endpoint       | Description           | Body                     |
| ------ | -------------- | --------------------- | ------------------------ |
| `POST` | `/api/enrich`  | Enrich a text prompt  | `{ "prompt": "string" }` |
| `GET`  | `/api/health`  | Health check          | –                        |

### Example Request

```bash
curl -X POST http://localhost:5000/api/enrich \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Find mid-size SaaS companies in the United States"}'
```

### Example Response

```json
{
  "results": [
    {
      "type": "company",
      "name": "Acme SaaS Inc",
      "domain": "acmesaas.com",
      "industry": "Software",
      "revenue": "25M",
      "employee_count": 50,
      "country": "United States",
      "linkedin_url": "https://linkedin.com/company/acmesaas",
      "raw": { ... }
    }
  ]
}
```

---

## 🌗 Features

- ✅ **NLP-powered search** – describe what you're looking for in plain English
- ✅ **Gemini AI** – converts free-text into structured API filters
- ✅ **Explorium integration** – fetches real B2B company & prospect data
- ✅ **Mock mode** – works without an Explorium API key for demo/testing
- ✅ **Dark / Light theme** – toggle with localStorage persistence
- ✅ **Sample prompts** – one-click examples to get started quickly
- ✅ **Raw JSON drill-down** – inspect the full API response per result
- ✅ **Rate limiting** – protects the API from abuse
- ✅ **Error handling** – user-friendly error messages and backend logging
- ✅ **Responsive design** – optimized for desktop & mobile

---

## 📝 License

This project is for demonstration and educational purposes.

---

## 👤 Author

**Chinmay Karkamkar** – [GitHub](https://github.com/ChinmayKarkamkar12)
