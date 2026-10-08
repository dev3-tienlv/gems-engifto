import { expect, test } from '@playwright/test';
import { site, navigation } from '../src/content/site';

test('visitors can explore the company website without broken links or pretend contact details', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(site.seo.title);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const mailLinks = page.locator('a[href^="mailto:"]');
  await expect(mailLinks).toHaveCount(site.contactEmail ? 3 : 0);
  if (site.contactEmail) {
    for (const link of await mailLinks.all()) await expect(link).toHaveAttribute('href', `mailto:${site.contactEmail}`);
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', site.indexable ? 'index, follow' : 'noindex, nofollow');
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))),
  );
  expect(brokenAnchors).toEqual([]);
  if (site.sections.faq && site.faq.items.length) {
    await page.getByText(site.faq.items[0].question, { exact: true }).click();
    await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  }
  expect(errors).toEqual([]);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`page fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test('mobile navigation supports keyboard, closes after navigation, and works with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const menu = page.getByRole('button', { name: site.labels.openMenu });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  if (navigation.length) {
    await page.getByRole('navigation', { name: site.labels.navigation }).getByRole('link', { name: navigation[0].label, exact: true }).click();
    expect(new URL(page.url()).hash).toBe(`#${navigation[0].section}`);
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
  }
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('content remains reachable when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  if (navigation.length) {
    await page.getByRole('navigation', { name: site.labels.navigation }).getByRole('link', { name: navigation[0].label, exact: true }).click();
    expect(new URL(page.url()).hash).toBe(`#${navigation[0].section}`);
  }
  if (site.sections.faq && site.faq.items.length) {
    await page.getByText(site.faq.items[0].question, { exact: true }).click();
    await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  }
  await context.close();
});

test('a missing page offers a working way home and stays out of search', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page).toHaveTitle(`${site.notFound.pageTitle} — ${site.name}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await page.getByRole('link', { name: site.notFound.cta, exact: true }).click();
  await expect(page).toHaveTitle(site.seo.title);
});
