# Engifto landing page — 2026-10-08

## Scope
A complete English company landing page, with editable copy and Vercel static deployment. The founder confirmed general e-commerce website operations via the user's supplied message, citing Goldfish Commerce as a reference. Positioning covers storefront management, product catalogs/content, and day-to-day operations. The earlier POD/concept positioning is superseded. Goldfish's legal details, catalog, prices, testimonials, ratings and shipping policies are not attributed to Engifto. The optional AI section is hidden until an actual use case is confirmed.

## Design
UI/UX Pro Max informs an editorial, spacious layout. Claude-inspired warm ivory, charcoal, terracotta, large Newsreader serif headings, DM Sans body copy. Use an original Engifto wordmark and vector illustration; do not copy Claude assets, proprietary fonts, logos, or affiliation claims. Light theme only. Strong focus states, semantic landmarks, reduced-motion support and responsive layouts.

## Architecture
Astro static output, local fonts, CSS tokens, minimal script for mobile navigation. All visitor-facing text and section switches live in `src/content/site.ts`. Site URL and SEO use the Astro site setting. No backend, analytics, signup form, AI integration, or fabricated email.

## Acceptance
- Build and Astro type checks pass.
- No horizontal overflow at 375, 768, 1024 and 1440px.
- Navigation and FAQ work with keyboard and reduced motion.
- Hidden sections leave no broken navigation links.
- SEO preview, favicon, social image and useful 404 exist.
- Draft defaults to noindex; README explains how to prepare actual public content.
- Startup checklist distinguishes official eligibility from website recommendations.
