# Database Changes Log

Tracks every SQL / RLS / schema change suggested or applied, and which
environment it targets.

## Current Environment

- **Target DB:** none (no D1/R2 binding active).
- Source: `.openai/hosting.json` has `"d1": null` and `"r2": null`.
- `db/schema.ts` is intentionally empty.

## Changes

| Date | Env | Type | Change | Status |
| ---- | --- | ---- | ------ | ------ |
| 2026-06-04 | n/a | — | Command Center dashboard added. Uses static in-code data (`app/lib/inbox.ts`). No SQL, RLS, or schema changes. | applied |
| 2026-06-04 | n/a | — | Site feedback board: JSON files (`data/feedback.json`, `public/feedback.json`) + Netlify Blobs store `windham-kiosk-feedback` via `netlify/functions/feedback.mjs`. No D1/SQL/RLS. | applied |
| 2026-06-04 | production (Netlify) | redirect | `/feedback.json` → `/.netlify/functions/feedback` so agents see live persisted entries, not the empty static file. | pending deploy |
| 2026-06-04 | local / Netlify | storage | Private help requests: `data/help-requests.json` (local, gitignored) + Netlify Blobs `windham-kiosk-help-requests`. No public JSON. GET requires `HELP_REQUEST_ADMIN_SECRET`. | applied |

> No SQL or RLS has been run against any production or staging database.
> When a database is introduced, record every migration/policy here before
> applying it, and confirm the active environment from the loaded env file.
