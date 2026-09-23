# TruckWala 24×7 website

A fast Vite + React public website for commercial-vehicle service information. The WebGL truck is loaded only on larger screens, after the main interface bundle, and respects reduced-motion preferences.

## Before publishing contact details

`src/data/content.ts` intentionally has no live phone, WhatsApp, map, email, or social-profile links. Replace only the values verified by the owner. Do not add guessed Google Maps URLs or social handles.

## Deploy

- **GitHub Pages:** enable Pages with **GitHub Actions** as the source. Pushing to `work` runs `.github/workflows/deploy-pages.yml`. Pages hosts the public brochure site only; lead submission requires Vercel.
- **Vercel/custom domain:** import the repository into Vercel, add the custom domain, and set `POSTGRES_URL` in Project Settings → Environment Variables. Never use a `VITE_` prefix for database credentials. Vercel exposes `api/leads.ts` server-side while the browser only calls `/api/leads`.
- Create the table once in the private Postgres database:

```sql
CREATE TABLE service_leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_no TEXT,
  service_type TEXT,
  location TEXT,
  fleet_size TEXT,
  details TEXT,
  inquiry_type TEXT
);
```

For GitHub Pages, use its URL as a preview/brochure deployment. Use the Vercel custom domain for form submissions because static hosting cannot keep database credentials private.
