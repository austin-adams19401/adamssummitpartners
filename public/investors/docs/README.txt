Investor Area Documents
=======================

This folder serves documents behind the /investors/* auth gate.

Convention:
- Drop PDFs (or other static files) in this folder.
- Reference them from src/pages/investors/index.astro and
  src/pages/investors/documents.astro by adding an entry to the documents
  array. Keep the two arrays in sync until the documents list moves to a
  real content source.
- File names should be lowercase-kebab.pdf for clean URLs.

Access:
- Every path under /investors/* (including assets in this folder) is
  gated by netlify/edge-functions/investor-gate.ts. The function checks
  HTTP Basic Auth using INVESTOR_PORTAL_USER and INVESTOR_PORTAL_PASS.

Phase 3 migration:
- When document volume grows or per-investor access matters, migrate to
  Netlify Blobs. Keep this folder as a fallback for genuinely static
  shared docs.
