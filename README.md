# Adams Summit Partners — Website

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

The contact form (`src/components/ContactForm.astro`) is a Netlify Form — submissions appear in the Netlify dashboard and can be forwarded to email. Configure notifications in: **Netlify → Site → Forms → Notifications**.

## Content

Content lives in `src/content/` as markdown/MDX with typed frontmatter (see `src/content/config.ts`):

- `src/content/deals/` — portfolio deal cards (shown on `/` and `/portfolio`)
- `src/content/team/` — team member bios (shown on `/` and `/about`)
- `src/content/blog/` — blog posts (shown on `/blog`)

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

- `navy` `#0B1E3B` — primary surfaces
- `gold` `#C9A961` — accent / CTAs
- `cream` `#FAF8F3` — light section backgrounds
- `charcoal` `#1F2937` — body text on light surfaces

Fonts are `Cormorant Garamond` (display) and `Inter` (body), loaded via `@fontsource` in `src/styles/global.css`.

## Placeholder content

All placeholder copy is tagged with `<!-- PLACEHOLDER -->` comments. Grep the repo before launch:

```bash
grep -rn "PLACEHOLDER" src/
```

## Out of scope (v1)

- Investor portal / authentication
- Accredited investor verification
- Newsletter integration
- Analytics

These can be layered in without rebuilding the site. See the original plan in `~/.claude/plans/` for notes on phase 2.
