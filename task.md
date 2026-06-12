# Task: Brand & Home Page (done)

- [x] Real logo at `public/logo.jpg` in header and footer
- [x] Design kit colors, typography (Cormorant Garamond + Inter), pill CTAs
- [x] Feature grid, value cards, footer layout per brand kit
- [x] Fixed `next/image` fetch error (`images.unoptimized` + `unoptimized` prop)

---

# Task: Command Center Dashboard

Turn the pasted inbox/message triage into an interactive "Command Center"
dashboard page inside the existing Windham KIOSK app, without changing the
existing landing page.

## Goals

- Single, typed source of truth for all inbox items (consistent data structure).
- Reusable, composable UI components (no copy-paste card markup).
- Interactive filtering by priority and category.
- Visual triage: urgent items, project tracking, and suggested actions.

## Breakdown

- [ ] 1. Data model (`app/lib/inbox.ts`)
  - `Priority`, `Category` unions
  - `InboxItem` interface (id, title, summary, source, date, due, priority,
    category, tags, action)
  - Seed data from the pasted email/message summary
  - Helper selectors: counts, grouping, sorting, derived "suggested actions"
- [ ] 2. Reusable components (`app/components/`)
  - `Badge` (priority + category variants)
  - `StatTile` (KPI number + label)
  - `InboxItemCard` (renders any `InboxItem`)
  - `SectionHeading` (eyebrow + title + optional description)
- [ ] 3. Interactive board (`app/components/InboxBoard.tsx`, client)
  - Filter by priority + category
  - Empty state
- [ ] 4. Route (`app/command-center/page.tsx`, server)
  - Header, stat row, board, suggested actions
  - Nav link from the home page
- [ ] 5. Verify: `npm run lint` + `npm run build`

## Notes / Decisions

- New route lives at `/command-center`; home page (`/`) is untouched.

---

# Task: Site feedback board

- [x] Shared types in `app/lib/feedback.ts`
- [x] File store (`data/feedback.json` + `public/feedback.json`) for local dev
- [x] `POST/GET /api/feedback` when running `npm run dev`
- [x] Netlify function `netlify/functions/feedback` (Blobs) for production saves
- [x] Page at `/feedback` with form + published list
- [x] Nav link from home header; agent-readable `/feedback.json`
- [x] Feedback applied: graphic-only header logo, borderless header, removed duplicate hero logo

---

# Task: Private help requests

- [x] Public form at `/request-help` (POST only, no public listing)
- [x] Organizer inbox at `/help/inbox` (access code = `HELP_REQUEST_ADMIN_SECRET`)
- [x] Netlify function + local API; Blobs store separate from public feedback
- [x] Home `#connect` CTA + nav link
- [ ] Deploy: set `HELP_REQUEST_ADMIN_SECRET` in Netlify env and share inbox URL + code with Milly
- Reuses existing design tokens in `app/globals.css` (forest-green, earth-brown,
  cream) and adds priority accent tokens.
- Data is static/in-code for now (no database). See `databasechanges.md`.

---

# Task: Apply Jun 11 site feedback

- [x] Hero H1 — Windham, Ashland, and Jewett
- [x] `#connect` section — inclusive copy
- [x] Welcome Wagon section — shorter feedback copy (#4)
- [x] Top nav + footer — Events links to `/events`
- [x] Events page — potluck spotlight, placeholder calendar, event gallery
- [ ] Dynamic calendar (future)
