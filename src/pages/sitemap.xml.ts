import type { APIRoute } from 'astro';
import { products } from '../content/catalog';
import { policies } from '../content/policies';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/shop/', '/about/', '/approach/', '/contact/', '/photography/', ...products.map(product => `/products/${product.id}/`), ...Object.keys(policies).map(slug => `/policies/${slug}/`)];
  const entries = paths.map(path => `<url><loc>${new URL(path, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
