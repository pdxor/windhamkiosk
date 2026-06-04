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

> No SQL or RLS has been run against any production or staging database.
> When a database is introduced, record every migration/policy here before
> applying it, and confirm the active environment from the loaded env file.
