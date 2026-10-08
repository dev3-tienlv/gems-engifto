# Verification and review — 2026-10-08

## Evidence

- `npm run build`: static homepage, 404 and robots.txt generated successfully; social PNG included in dist.
- `npm run check`: 12 files, zero errors, warnings or hints.
- `npm test`: eight Playwright tests passed in Google Chrome. Includes four viewport widths, menu keyboard/Escape/navigation behavior, reduced motion, no-JavaScript fallback, FAQ, links, metadata, and 404 return path.
- Initial browser test failed against the blank scaffold (`Scaffold` title instead of Engifto), then passed after the implementation.
- Temporary config smoke check passed with all optional sections disabled, indexing enabled and a test-only email: zero broken anchors, correct mailto links, matching meta/robots. The test variant was restored in a `finally` block and the original draft rebuilt.
- `npm audit --audit-level=moderate`: zero known vulnerabilities reported.
- Desktop and mobile screenshots inspected. A full-page capture artifact after resizing was resolved by opening a fresh mobile browser page; DOM contained only one header and hero.
- Main text/CTA colors meet 4.5:1 contrast. Figure caption color was darkened during review to meet normal-text contrast.
- Production resource check: CSS plus three local font requests; no remote runtime assets. Approximately 160 KB of font transfers and 644 bytes of inline interaction script. These are local transfer observations, not a Lighthouse/Core Web Vitals benchmark.

## Review

Correctness: navigation is derived from section switches; no contact link is invented; draft metadata is consistent; 404 stays noindex. All copy is centralized, with type-checked icon variants.

Readability/architecture: static Astro pages, one content module, CSS tokens, two small presentational components and one layout. No backend or UI framework runtime is required. Astro was chosen over a full React/Next app because this page has no server data or app state; plain HTML would require more manual synchronization for the editable copy and metadata.

Security/privacy: no form, account, tracking, secrets or remote client integration. Source data is rendered as escaped text; no untrusted HTML is interpolated. noindex is documented as crawler guidance, not access control.

Performance: local variable fonts use weight-only files instead of full optical-size axes; SVG artwork and a small menu script avoid large runtime dependencies. No performance score is claimed.

## Limits

Vercel deployment, DNS, HTTPS on the real domain, email mailbox and Claude Console application have not been performed. Engifto's business/legal identity and product remain provisional. The supplied GemsUnited site is a source for industry context, not proof of Engifto's eligibility, corporate affiliation or AI integration. The authenticated application form was not inspected.

Browser MCP instances were busy with other profiles; tests and screenshots used independently launched Chrome instances without altering those profiles.
