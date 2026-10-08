# Engifto implementation plan

**Goal:** Deliver an editable Claude-inspired landing page and Vercel handoff.

**Architecture:** Astro generates static HTML from one content file. CSS contains design tokens; original vector artwork and self-hosted fonts require no remote runtime requests.

**Tech stack:** Astro, TypeScript, vanilla CSS, Fontsource, Playwright.

- [x] Scaffold Astro and browser checks; verify the tests detect the missing landing page.
- [x] Add typed copy, layout metadata, original artwork and homepage; verify build and type checks.
- [x] Add responsive styles and keyboard-friendly navigation; run browser checks and inspect screenshots.
- [x] Add local social image, 404 and draft robots behavior; verify generated files.
- [x] Write Vietnamese editing/deployment instructions and a sourced Claude Startups checklist.
- [x] Review correctness, accessibility, dependency security and request scope; record verification evidence.

No deployment or registration is performed as part of this local scaffold.
