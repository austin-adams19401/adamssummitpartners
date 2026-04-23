# Adams Summit Partners Website

Marketing site for Adams Summit Partners, a private real estate syndication firm.

Built with Astro + Tailwind, deployed on Netlify.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:4321>. Hot reload is enabled.

## Build

```bash
npm run build       # produces static site in dist/
npm run preview     # serve the built site locally
```

## Deploy

Pushing to `main` triggers a Netlify build. `netlify.toml` pins:

- Build command: `npm run build`
- Publish dir: `dist`
- Node version: 20

The contact form (`src/components/ContactForm.astro`) is a Netlify Form. Submissions appear in the Netlify dashboard and can be forwarded to email. Configure notifications in: **Netlify → Site → Forms → Notifications**.

## Content

Content lives in `src/content/` as markdown/MDX with typed frontmatter (see `src/content/config.ts`):

- `src/content/deals/` for portfolio deal cards (shown on `/` and `/portfolio`)
- `src/content/team/` for team member bios (shown on `/` and `/about`)
- `src/content/blog/` for blog posts (shown on `/blog`)

### Adding a blog post

Create `src/content/blog/my-post.md` (or `.mdx` for JSX in content):

```md
---
title: "Why Mountain West multifamily"
description: "Short preview shown in listings and meta tags."
pubDate: 2026-05-01
author: "Austin Adams"
image: "https://images.unsplash.com/..."
tags: ["market", "thesis"]
---

Post body in markdown.
```

### Adding a deal

Create `src/content/deals/my-deal.md` with the shape in `src/content/config.ts`. Set `featured: true` to show it on the homepage.

### Adding a team member

Create `src/content/team/name.md` with `name`, `role`, `bio`, optional `photo`, and `order`.

## Brand tokens

Set in `tailwind.config.mjs`:

- `navy` `#0B1E3B` for primary surfaces
- `gold` `#C9A961` for accent / CTAs
- `cream` `#FAF8F3` for light section backgrounds
- `charcoal` `#1F2937` for body text on light surfaces

Fonts are `Cormorant Garamond` (display) and `Inter` (body), loaded via `@fontsource` in `src/styles/global.css`.

## Environment variables

Set these in **Netlify → Site → Environment variables** for production and in a local `.env` if running with `netlify dev`:

| Variable | What it does |
| --- | --- |
| `BUTTONDOWN_API_KEY` | Authenticates the newsletter signup Netlify function against the Buttondown API. Generate in Buttondown settings. |
| `INVESTOR_PORTAL_USER` | Username for the site-wide investor area password. Any string. |
| `INVESTOR_PORTAL_PASS` | Password for the investor area. Rotate by updating this value. |

Without `BUTTONDOWN_API_KEY`, the footer and blog newsletter forms will surface a graceful "not configured" error. Without the two investor env vars, `/investors/*` returns a 503.

## Newsletter (Buttondown)

Component: `src/components/NewsletterForm.astro`. Submits to the Netlify function at `netlify/functions/newsletter-signup.ts`, which proxies to `https://api.buttondown.email/v1/subscribers`.

- Footer: stacked variant across every page.
- Blog post tails: inline variant in a cream card above the related-posts block.
- Welcome email is configured inside Buttondown, not in code.

## Investor area (`/investors/*`)

Password-gated via a Netlify Edge Function (`netlify/edge-functions/investor-gate.ts`) that checks HTTP Basic Auth on every request under `/investors/*`. The browser handles the prompt UI natively.

Pages:

- `src/pages/investors/index.astro` for welcome + documents teaser + Calendly button.
- `src/pages/investors/documents.astro` for the full document listing.

Documents:

- Live as static files in `public/investors/docs/`.
- Add the file, then add an entry to the `documents` array in both `investors/index.astro` and `investors/documents.astro` (keep them in sync).
- File names should be lowercase-kebab.pdf for clean URLs.
- Every path under `/investors/*` is gated, including these asset paths.

Calendly:

- Currently a `TODO_CALENDLY_URL` placeholder in `src/pages/investors/index.astro`. When Austin provides the real URL, replace the constant and the button flips from "Email to schedule" to "Book on Calendly".

Phase 3 migration notes:

- Move documents to Netlify Blobs when volume grows or per-investor access matters.
- Replace site-wide password with per-user auth when first real offering opens.

## SEO + structured data

`src/layouts/BaseLayout.astro` emits a JSON-LD Organization schema on every page and accepts a `description` prop for per-page meta descriptions. Sitemap excludes `/investors/*`; `robots.txt` disallows it; the edge function sets `X-Robots-Tag: noindex, nofollow`.

## Out of scope (current phase)

- Per-user auth / accredited investor verification
- Netlify Blobs document storage
- Analytics
- Inline Calendly embed (button/link for now)

Phase plans live in `~/.claude/plans/`.
