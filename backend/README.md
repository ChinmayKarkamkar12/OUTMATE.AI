# ⚙️ OutMate – Backend API

> Express 5 + TypeScript REST API that converts natural-language prompts into structured B2B data using **Gemini AI** and the **Explorium API**.

---

## 🏗️ Architecture Overview

```
  POST /api/enrich  { prompt }
           │
           ▼
  ┌─────────────────────┐
  │  Enrich Controller  │   ← validates input, orchestrates flow
  └────────┬────────────┘
           │
  ┌────────▼────────────┐
  │   Gemini Service    │   ← sends prompt to Gemini 2.5 Flash
  │   (NLP → JSON)      │     returns { entity_type, filters }
  └────────┬────────────┘
           │
  ┌────────▼────────────┐
  │  Explorium Service  │   ← queries Explorium API (or mock data)
  │  (filters → data)   │     returns raw company/prospect records
  └────────┬────────────┘
           │
  ┌────────▼────────────┐
  │ Normalize Service   │   ← standardizes response fields
  └────────┬────────────┘
           │
           ▼
  200 OK  { results: [...] }
```

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── app.ts                  # Express app (CORS, JSON, routes, error handler)
│   ├── server.ts               # Entry point – loads .env, starts listening
│   │
│   ├── controllers/
│   │   └── enrich.controller.ts  # POST /api/enrich handler
│   │
│   ├── services/
│   │   ├── gemini.service.ts     # Gemini AI integration (prompt → structured filters)
│   │   ├── explorium.service.ts  # Explorium API integration (filters → B2B data)
│   │   └── normalize.service.ts  # Normalizes raw API results into a consistent schema
│   │
│   ├── middlewares/
│   │   ├── rateLimiter.ts        # express-rate-limit config
│   │   ├── errorHandler.ts       # Global error handler
│   │   └── validatePrompt.ts     # Input validation middleware
│   │
│   ├── routes/
│   │   ├── enrich.routes.ts      # POST /api/enrich
│   │   └── health.routes.ts      # GET  /api/health
│   │
│   ├── types/
│   │   └── filters.ts            # TypeScript interfaces for StructuredFilters, CompanyFilters, ProspectFilters
│   │
│   ├── config/
│   │   └── env.ts                # Centralized environment variable access
│   │
│   └── utils/                    # Helper utilities
│
├── .env                          # Environment variables (not committed)
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
EXPLORIUM_API_KEY=your_explorium_api_key_here
USE_EXPLORIUM_MOCK=true
FRONTEND_URL=http://localhost:3000
```

| Variable               | Required | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `PORT`                 | No       | Server port (default: `5000`)                       |
| `GEMINI_API_KEY`       | **Yes**  | Google Gemini API key for NLP processing            |
| `EXPLORIUM_API_KEY`    | No*      | Explorium API key for B2B data (*required if mock is off) |
| `USE_EXPLORIUM_MOCK`   | No       | Set to `"false"` to use the real Explorium API (default: mock) |
| `FRONTEND_URL`         | No       | Allowed CORS origin (default: `*`)                  |

### 3. Start Development Server

```bash
npm run dev
```

The server starts at **http://localhost:5000** with hot-reload via `ts-node-dev`.

### 4. Production Build (optional)

```bash
npm run build       # compile TypeScript to dist/
npm start           # run dist/server.js
```

---

## 🔌 API Reference

### `POST /api/enrich`

Converts a natural-language prompt into enriched B2B data.

**Request:**
```json
{
  "prompt": "Find mid-size SaaS companies in the United States"
}
```

**Response (200):**
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

**Error Response (400):**
```json
{
  "message": "Prompt is required",
  "error_code": "INVALID_PROMPT"
}
```

**Error Response (429 — Gemini rate limited):**
```json
{
  "message": "Gemini rate limit exceeded. Please try again shortly.",
  "error_code": "GEMINI_RATE_LIMIT"
}
```

**Error Response (500):**
```json
{
  "message": "Failed to process prompt using Gemini.",
  "error_code": "GEMINI_ERROR"
}
```

### `GET /api/health`

Health check endpoint.

**Response (200):**
```json
{
  "status": "ok"
}
```

---

## 🧩 Key Services

### Gemini Service (`gemini.service.ts`)
- Sends the user prompt to **Google Gemini 2.5 Flash** via `x-goog-api-key` header authentication
- Gemini returns structured JSON: `{ entity_type: "company" | "prospect", filters: { ... } }`
- Custom error classes: `GeminiRateLimitError` (429) and `GeminiResponseError` (other failures)
- Automatic retry with backoff on 429 rate limit errors
- Handles double-stringified JSON, markdown code fences, and empty responses
- 10-second request timeout to prevent hanging

### Explorium Service (`explorium.service.ts`)
- Takes the entity type and filters from Gemini
- In **mock mode**: returns 3 sample records (no API key needed)
- In **real mode**: calls the Explorium `/v1/businesses` or `/v1/prospects` endpoint
- Wraps filter arrays into Explorium's `{ values: [...] }` format
- Caps results at 3 per request

### Normalize Service (`normalize.service.ts`)
- Maps raw API fields to a clean, consistent schema
- Handles both mock data and real Explorium field names (e.g. `naics_description` → `industry`, `number_of_employees_range` → `employee_count`)

---

## 🛡️ Middleware

| Middleware          | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| **Rate Limiter**    | Limits API requests to prevent abuse (`express-rate-limit`) |
| **Validate Prompt** | Ensures the `prompt` field is present and non-empty    |
| **Error Handler**   | Catches all errors and returns clean JSON responses    |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js ≥ 18
- **Framework:** Express 5
- **Language:** TypeScript 5
- **AI:** Google Gemini 2.5 Flash API
- **Data:** Explorium B2B API
- **Dev Tools:** ts-node-dev (hot reload)
