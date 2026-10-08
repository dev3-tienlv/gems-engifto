import { expect, test } from '@playwright/test';
import { site } from '../src/content/site';
import { readFileSync } from 'node:fs';
const securityPolicy = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')).headers[0].headers.find((header: { key: string }) => header.key === 'Content-Security-Policy').value;

test('home has working navigation, loaded photos, FAQ and preview metadata', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(site.seo.title);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await page.getByText(site.faq.items[0].question, { exact: true }).click();
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  const links = await page.locator('a[href^="/"]').evaluateAll(elements => [...new Set(elements.map(e => e.getAttribute('href')!.split(/[?#]/)[0]))]);
  for (const href of links) expect((await request.get(href)).ok(), href).toBeTruthy();
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0)).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('shop filters, search, sort, empty state and URL restoration work', async ({ page }) => {
  await page.goto('/shop');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(32);
  await page.getByRole('button', { name: 'Desk lighting', exact: true }).click();
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(3);
  await page.getByLabel('Sort by').selectOption('name');
  const names = await page.locator('[data-product-card]:visible').evaluateAll(cards => cards.map(card => (card as HTMLElement).dataset.name!));
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  await page.reload();
  await expect(page.getByRole('button', { name: 'Desk lighting', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('searchbox', { name: 'Search products' }).fill('not-a-product');
  await expect(page.getByRole('heading', { name: 'No essentials found.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(32);
  await page.getByRole('searchbox', { name: 'Search products' }).fill('notebook');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(4);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`store pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const path of ['/', '/shop', '/products/everyday-notebook', '/about', '/approach', '/contact']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(width);
    }
  });
}

test('mobile menu supports keyboard and Escape with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const menu = page.getByRole('button', { name: site.labels.openMenu });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Collection' }).click();
  await expect(page).toHaveURL(/shop/);
});

test('browsing and FAQ remain accessible without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.getByText(site.faq.items[0].question, { exact: true }).click();
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Collection' }).click();
  await expect(page.locator('[data-product-card]')).toHaveCount(32);
  await expect(page.locator('.no-js-note')).toBeVisible();
  await context.close();
});

test('404 offers a working way home', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page).toHaveTitle(`${site.notFound.pageTitle} — ${site.name}`);
  await page.getByRole('link', { name: site.notFound.cta, exact: true }).click();
  await expect(page).toHaveTitle(site.seo.title);
});

test('all product pages have local decodable photos and no prototype labels', async ({ page, request }) => {
  await page.goto('/shop');
  const links = await page.locator('[data-product-card] .product-card-image').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
  expect(links).toHaveLength(32);
  for (const path of links) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    const html = await response.text();
    expect(html, path).not.toContain('data-add-id');
    expect(html, path).not.toContain('detail-price');
    expect(html, path).not.toMatch(/>(?:[^<]*(?:\bdemo\b|\bpreview\b|\bbag\b)[^<]*)</i);
    const image = html.match(/class="detail-image"[^]*?<img[^]*?src="([^"]+)"/)?.[1];
    expect(image, path).toMatch(/^\/images\/.+\.webp$/);
    const photo = await request.get(image!);
    expect(photo.ok(), image).toBeTruthy();
    expect(photo.headers()['content-type']).toContain('image/webp');
  }
  for (const photo of await page.locator('[data-product-card] img').all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy();
  }
  for (const path of ['/', '/about', '/approach', '/contact', '/photography', '/policies/shipping', '/policies/returns', '/policies/privacy', '/policies/terms']) {
    await page.goto(path);
    expect(await page.locator('body').innerText(), path).not.toMatch(/\bdemo\b|\bpreview\b|\bbag\b/i);
  }
});

test('business context, metadata and crawler routes describe the storefront accurately', async ({ page, request }) => {
  await page.goto('/about');
  await expect(page.getByText(site.business.description, { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: /A focused business/ })).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(site.contactEmail ? 2 : 0);
  const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(schema).toMatchObject({ '@type': 'WebSite', name: 'Engifto', url: 'https://engifto.com/', inLanguage: 'en' });
  expect(schema).not.toHaveProperty('foundingDate');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).not.toContain('Disallow: /\n');
  expect(robots).toContain('Sitemap: https://engifto.com/sitemap.xml');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const parsed = await page.evaluate(xml => {
    const document = new DOMParser().parseFromString(xml, 'application/xml');
    return { errors: document.querySelectorAll('parsererror').length, urls: [...document.querySelectorAll('loc')].map(node => node.textContent) };
  }, sitemap);
  expect(parsed.errors).toBe(0);
  expect(parsed.urls).toHaveLength(42);
  expect(parsed.urls).toContain('https://engifto.com/about/');
  expect(parsed.urls).toContain('https://engifto.com/approach/');
  expect(parsed.urls).not.toContain('https://engifto.com/checkout/');
});


test('company pages lead with business context and keep commerce secondary', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('.hero-actions .button')).toHaveAttribute('href', '/about');
  await expect(page.locator('main [data-add-id]')).toHaveCount(0);
  await expect(page.locator('header [data-cart-link]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Workspace commerce.' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Our approach', exact: true }).click();
  await expect(page).toHaveURL(/approach/);
  await expect(page.getByRole('heading', { name: 'Focus the collection.' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Our approach', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('navigation').getByRole('link', { name: 'Collection', exact: true }).click();
  await expect(page.locator('header [data-cart-link]')).toHaveCount(0);
  for (const path of ['/about/', '/approach/', '/contact/']) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    const html = await response.text();
    expect(html).not.toContain('powered by Claude');
  }
});


test('collection is read only under production CSP and old checkout routes return to it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/*', async route => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': securityPolicy } });
  });
  await page.goto('/shop');
  await expect(page.locator('[data-add-id], [data-cart-link]')).toHaveCount(0);
  await expect(page.getByLabel('Sort by').locator('option[value^="price"]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/\$\d/);
  await expect(page.getByRole('link', { name: 'Explore this piece', exact: true })).toHaveCount(0);
  await page.locator('[data-product-card] .product-card-image').first().click();
  await expect(page).toHaveURL(/products\//);
  await expect(page.locator('[data-add-id], [name="quantity"]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/\$\d|Add to cart|Shipping calculated/);
  await page.getByRole('link', { name: 'Explore this collection', exact: true }).click();
  await expect(page).toHaveURL(/shop/);
  const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }));
  expect(storage).toEqual({ local: 0, session: 0 });
  for (const path of ['/cart', '/checkout', '/order-confirmation']) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/shop\/?$/);
  }
  expect(errors).toEqual([]);
});
