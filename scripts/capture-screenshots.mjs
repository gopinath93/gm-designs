import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const SCREENSHOTS_DIR = resolve('screenshots');

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();

  const viewports = [
    { name: 'mobile-360', width: 360, height: 640 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1280', width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    console.log(`📸 Capturing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

    // 1. Above the fold screenshot
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/${vp.name}-above-fold.png`,
    });

    // 2. Full page screenshot
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/${vp.name}-full.png`,
      fullPage: true,
    });

    // 3. Header component screenshot
    const header = await page.$('#main-header');
    if (header) {
      await header.screenshot({
        path: `${SCREENSHOTS_DIR}/${vp.name}-header.png`,
      });
    }

    // 4. Footer component screenshot
    const footer = await page.$('footer');
    if (footer) {
      await footer.screenshot({
        path: `${SCREENSHOTS_DIR}/${vp.name}-footer.png`,
      });
    }

    // If mobile, test opening mobile drawer (only if toggle is visible)
    const toggle = await page.$('#mobile-menu-toggle');
    if (toggle && (await toggle.isVisible())) {
      await toggle.click();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: `${SCREENSHOTS_DIR}/${vp.name}-menu-open.png`,
      });
    }

    // If desktop, test hovering over services dropdown (only if visible)
    const servicesMenu = await page.$('#services-menu-button');
    if (servicesMenu && (await servicesMenu.isVisible())) {
      await servicesMenu.hover();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: `${SCREENSHOTS_DIR}/${vp.name}-services-dropdown.png`,
      });
    }

    await page.close();
  }

  await browser.close();
  console.log(`✅ All screenshots captured in ${SCREENSHOTS_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
