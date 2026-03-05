/**
 * screenshot_pages.js
 * Takes full-page screenshots of specified URLs using Playwright.
 *
 * Usage:
 *   node scripts/screenshot_pages.js                        # screenshots all default pages
 *   node scripts/screenshot_pages.js <url1> <url2> ...      # screenshots specific URLs
 *
 * Output: screenshots saved to /screenshots/
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://toprated.nz';

const DEFAULT_PAGES = [
  '/cities/auckland/cuisine/restaurants.html',
  '/cities/auckland/cuisine/indian-restaurants.html',
  '/cities/auckland/cuisine/italian-restaurants.html',
  '/cities/auckland/cuisine/japanese-restaurants.html',
  '/cities/auckland/cuisine/chinese-restaurants.html',
  '/cities/auckland/cuisine/thai-restaurants.html',
  '/cities/auckland/cuisine/french-restaurants.html',
];

async function screenshot(page, url, outputPath) {
  console.log(`  Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  // Wait for business cards to load (they render via JS)
  await page.waitForTimeout(2000);
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`  ✅ Saved: ${outputPath}`);
}

(async () => {
  const outputDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const urls = process.argv.slice(2).length > 0
    ? process.argv.slice(2).map(u => u.startsWith('http') ? u : BASE_URL + u)
    : DEFAULT_PAGES.map(p => BASE_URL + p);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  for (const url of urls) {
    const slug = url.replace(/https?:\/\/[^/]+/, '').replace(/[^a-z0-9]/gi, '_').replace(/^_+|_+$/g, '');
    const outputPath = path.join(outputDir, `${slug}.png`);
    try {
      await screenshot(page, url, outputPath);
    } catch (err) {
      console.error(`  ❌ Failed: ${url} — ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\nDone. Screenshots saved to /screenshots/`);
})();
