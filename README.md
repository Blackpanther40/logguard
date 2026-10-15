# LogGuard — Security & System Health Dashboard

B2B SaaS-style dashboard built with React, Vite, Tailwind CSS, Lucide Icons, Supabase, and live NVD CVE search.

## Features

- Responsive shell with sidebar navigation, light/dark theme, and header search
- Dashboard metrics, activity chart (CPU / memory / response time), and system events table
- Supabase auth and per-user `servers` table CRUD (RLS)
- Live CVE lookup via [NIST NVD API 2.0](https://nvd.nist.gov/developers/vulnerabilities)

## Quick start

```bash
npm install
cp .env.example .env   # add Supabase URL + anon key
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL Editor.
3. Enable Email auth (Authentication → Providers) if you use email/password sign-in.
4. Copy **Project URL** and **anon public** key into `.env`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Sign up or sign in under **Settings**, then manage servers on **Connected Servers**.

## CVE search

Development uses a Vite proxy (`/api/nvd` → NIST) to avoid browser CORS issues. Production builds call the NVD API directly; ensure your deployment allows outbound HTTPS to `services.nvd.nist.gov`. NVD rate limits apply—avoid rapid repeated searches.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
