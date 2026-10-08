# Engifto storefront design — 2026-10-08

## Contract
Replace the corporate landing with an English curated retail storefront for desk accessories and home-office essentials, keeping the existing ivory/terracotta/Newsreader/DM Sans identity. Build home, shop, product detail, cart, checkout, confirmation, about, contact and policy pages. The catalog and photography are a sample collection; no inventory, customer ratings, supplier partnerships or fulfilled orders are claimed.

## Flow
Shop supports category filters, search and sorting with URL state. Product pages allow quantity selection and adding to a persistent cart. Cart supports updates/removal and deterministic totals in integer cents. Checkout validates contact/shipping fields and creates a clearly labeled demo confirmation: no payment details, money, real orders, emails or personal-data persistence. A live commerce provider and server-verified pricing are a later production step.

## Content and images
Use 32 sample desk/stationery/decor products with unique slugs, price cents, category, description, details, local image and accurate alt text. Crawl Burst by Shopify and retain source/license links. Download and optimize local photos, inspect a contact sheet, and identify them as representative sample photography. Do not scrape another store's product IP or invent company/contact details.

## Implementation slices
1. Source images; catalog types/data; meaningful failing cart arithmetic and malformed-storage tests.
2. Implement pure cart logic and pass unit tests; build shared store shell/cards and homepage/shop/product routes.
3. Add persistent cart, search/filter/sort, checkout form and confirmation interactions.
4. Complete policy/contact/about content, regenerate social image, run production build/type checks and full browser flows.
5. Review accessibility, input rendering/storage, empty states, mobile overflow and image correctness. Document live-payment and inventory gaps.

## Acceptance
Local responsive storefront with working end-to-end demo purchase, persisted quantities, validated totals, empty-cart guards, safe storage parsing, no persisted PII, no payment network calls and clear demo labels. Build and type checks pass; browser flows cover filtering, quantity edits, reload, validation, demo completion and mobile layouts. All product image requests succeed and use local paths.

## Presentation update — October 8, 2026

User requested larger small text and prices, a filled outlined Add to cart control, consistent cart wording, a quantity badge over the icon, and 20 additional distinct products with sourced local images. The collection now has 32 products and 34 images. Visible demo/preview notes have been removed at the user’s request. Checkout still validates locally and produces a browser-local selection summary, with no real payment or fulfillment; confirmation does not claim an order was sent or paid. Internal storage keys are retained to preserve existing carts.

## ATC and review readiness update

ATC now uses a compact charcoal capsule with a bag silhouette, ivory label, and terracotta hover. Price hierarchy and larger readable text are retained. About adds concrete business context; metadata describes the actual workspace collection. Robots allows public-page crawling while meta noindex remains for the draft; sitemap omits transactional routes. WebSite structured data contains no unverified legal identity, traction, funding, stock status, or Claude integration. Official startup sources were re-read; user explicitly chose empty email/legal configuration. Publish the verified implementation to `dev3-tienlv/gems-engifto` on main, without deploying or submitting an application.
