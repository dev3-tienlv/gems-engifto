import type { APIRoute } from 'astro';
// Public pages remain readable by crawlers; meta robots controls indexing.
export const GET: APIRoute = ({ site }) => new Response(
  `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\nDisallow: /order-confirmation\nSitemap: ${new URL('/sitemap.xml', site)}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
