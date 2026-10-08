import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://engifto.com',
  output: 'static',
  devToolbar: { enabled: false },
  // Keep processed scripts external so the production CSP can use script-src 'self'.
  // https://vite.dev/config/build-options.html#build-assetsinlinelimit
  vite: { build: { assetsInlineLimit: 0 } },
});
