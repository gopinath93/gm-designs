import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';

const testPages = [
  '/',
  '/services/',
  '/services/whatsapp-ai-agent/',
  '/portfolio/',
  '/portfolio/po-sentry/',
  '/portfolio/plsh-salon/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/404',
];

async function runQualityAudit() {
  console.log(`Starting Quality Bar Audit on ${BASE_URL}...\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let failedChecks = 0;
  let totalChecks = 0;

  function assert(condition, message) {
    totalChecks++;
    if (!condition) {
      console.error(`  ❌ FAIL: ${message}`);
      failedChecks++;
    } else {
      console.log(`  ✅ PASS: ${message}`);
    }
  }

  // 1. Mobile Horizontal Scroll & Console Errors across key pages
  console.log('=== 1. MOBILE RESPONSIVENESS & CONSOLE AUDIT (360px) ===');
  await page.setViewportSize({ width: 360, height: 800 });

  for (const path of testPages) {
    const consoleErrors = [];
    const onConsole = (msg) => {
      const text = msg.text();
      // Ignore normal 404 network status error when visiting /404 page
      if (path === '/404' && text.includes('404 (Not Found)')) return;
      if (msg.type() === 'error') consoleErrors.push(text);
    };
    const onPageError = (err) => {
      consoleErrors.push(err.message);
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    const url = `${BASE_URL}${path}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(
      scrollWidth <= 360,
      `${path} mobile 360px scrollWidth is ${scrollWidth}px (must be <= 360)`
    );

    assert(
      consoleErrors.length === 0,
      `${path} console has 0 errors (found ${consoleErrors.length}: ${consoleErrors.join(', ')})`
    );

    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }

  // 2. Semantic Landmarks & H1 Check
  console.log('\n=== 2. SEMANTIC LANDMARKS & ACCESSIBILITY (WCAG 2.2 AA) ===');
  for (const path of testPages) {
    if (path === '/404') continue;
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });

    // Exclude Astro dev toolbar injected headings if running against dev server
    const h1Count = await page.locator('main h1, h1:not(astro-dev-toolbar *)').count();
    assert(h1Count === 1, `${path} has exactly one content <h1> element (found ${h1Count})`);

    const hasHeader = (await page.locator('header').count()) >= 1;
    assert(hasHeader, `${path} has <header> landmark`);

    const hasMain = (await page.locator('main#main-content').count()) === 1;
    assert(hasMain, `${path} has <main id="main-content"> landmark`);

    const hasFooter = (await page.locator('footer').count()) === 1;
    assert(hasFooter, `${path} has <footer> landmark`);

    const hasSkipLink = (await page.locator('a.skip-link[href="#main-content"]').count()) === 1;
    assert(hasSkipLink, `${path} has accessible skip link`);
  }

  // 3. Form Accessibility on /contact/
  console.log('\n=== 3. CONTACT FORM ACCESSIBILITY AUDIT ===');
  await page.goto(`${BASE_URL}/contact/`, { waitUntil: 'domcontentloaded' });
  const inputs = await page.locator('form input:not([type="hidden"]), form textarea, form select').all();
  let unlabelledCount = 0;
  for (const input of inputs) {
    const id = await input.getAttribute('id');
    const name = await input.getAttribute('name');
    const type = await input.getAttribute('type');
    if (type === 'checkbox') continue; // honeypot or custom checkbox
    if (id) {
      const label = await page.locator(`label[for="${id}"]`).count();
      if (label === 0) unlabelledCount++;
    } else {
      unlabelledCount++;
    }
  }
  assert(unlabelledCount === 0, `/contact/ all visible inputs have explicit <label for="..."> (unlabelled: ${unlabelledCount})`);

  // 4. Image Attributes (Explicit Width, Height & Alt Text)
  console.log('\n=== 4. IMAGE ACCESSIBILITY & LAYOUT SHIFT AUDIT ===');
  await page.goto(`${BASE_URL}/portfolio/`, { waitUntil: 'networkidle' });
  const images = await page.locator('img').all();
  let missingAlt = 0;
  let missingDimensions = 0;
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    const width = await img.getAttribute('width');
    const height = await img.getAttribute('height');
    if (alt === null || alt.trim() === '') missingAlt++;
    if (!width || !height) missingDimensions++;
  }
  assert(missingAlt === 0, `/portfolio/ all images have non-empty alt text (missing: ${missingAlt})`);
  assert(missingDimensions === 0, `/portfolio/ all images have explicit width and height (missing: ${missingDimensions})`);

  // 5. JavaScript Payload Size on Home Page
  console.log('\n=== 5. JAVASCRIPT BUNDLE BUDGET AUDIT (< 100 KB) ===');
  let totalJsBytes = 0;
  const onResponse = async (response) => {
    const url = response.url();
    // Exclude Vite dev server HMR and dev toolbar scripts
    if (url.includes('@vite') || url.includes('astro-dev-toolbar') || url.includes('node_modules')) {
      return;
    }
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('javascript') || url.endsWith('.js')) {
      try {
        const buffer = await response.body();
        totalJsBytes += buffer.length;
      } catch (e) {
        // ignore
      }
    }
  };

  page.on('response', onResponse);
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  page.off('response', onResponse);

  const kbSize = (totalJsBytes / 1024).toFixed(2);
  assert(
    totalJsBytes < 100 * 1024,
    `Home page client JavaScript transfer is ${kbSize} KB (budget is < 100 KB)`
  );

  // 6. Desktop 1280px Viewport Check
  console.log('\n=== 6. DESKTOP VIEWPORT AUDIT (1280px) ===');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert(
    desktopScrollWidth <= 1280,
    `Home page desktop 1280px scrollWidth is ${desktopScrollWidth}px (must be <= 1280)`
  );

  await browser.close();

  console.log(`\n========================================`);
  console.log(`Total checks run: ${totalChecks}`);
  console.log(`Passed: ${totalChecks - failedChecks}`);
  console.log(`Failed: ${failedChecks}`);
  console.log(`========================================`);

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runQualityAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
