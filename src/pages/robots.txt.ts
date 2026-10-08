import type { APIRoute } from 'astro';
import { site } from '../content/site';

export const GET: APIRoute = () => new Response(
  site.indexable ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
