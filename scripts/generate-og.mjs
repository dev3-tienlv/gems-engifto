import { chromium } from '@playwright/test';

// Run after `npm run build` and while the preview server is available.
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4321/');
  await page.evaluate(async () => {
    await document.fonts.ready;
    const logo = document.querySelector('.wordmark').cloneNode(true);
    const title = document.querySelector('h1').cloneNode(true);
    const label = document.querySelector('.hero .eyebrow').cloneNode(true);
    const artwork = document.querySelector('.sculpture').cloneNode(true);
    const main = document.createElement('main');
    main.className = 'social-card';
    const copy = document.createElement('div');
    copy.className = 'social-copy';
    copy.append(logo, label, title);
    const visual = document.createElement('div');
    visual.className = 'social-art';
    visual.append(artwork);
    main.append(copy, visual);
    document.body.replaceChildren(main);
    const style = document.createElement('style');
    style.textContent = `
      .social-card{width:1200px;height:630px;padding:60px 70px;display:grid;grid-template-columns:1.15fr 1fr;gap:45px;align-items:center;background:var(--background)}
      .social-copy{align-self:stretch;display:flex;flex-direction:column;justify-content:center}
      .social-copy .wordmark{font-size:36px;margin-bottom:60px}
      .social-copy .eyebrow{font-size:10px;margin-bottom:26px}
      .social-copy h1{font-size:76px;line-height:1.01;letter-spacing:-.04em}
      .social-copy h1 span{display:block}
      .social-art{background:var(--surface);border:1px solid var(--border);border-radius:8px;transform:rotate(2deg);padding:15px}
    `;
    document.head.append(style);
  });
  await page.screenshot({ path: 'public/og.png' });
  console.log('Generated public/og.png (1200 × 630) from the current hero.');
} finally {
  await browser.close();
}
