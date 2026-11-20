import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// Read _redirects to treat redirected paths as valid
const redirects = new Set();
const redirectsFile = path.join(distDir, '_redirects');
if (fs.existsSync(redirectsFile)) {
  const lines = fs.readFileSync(redirectsFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split(/\s+/);
      if (parts[0]) redirects.add(parts[0].replace(/\/$/, ''));
    }
  }
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Checking links across ${htmlFiles.length} HTML files in dist/...\n`);

let errorsCount = 0;
let totalCheckedLinks = 0;

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(distDir, filePath);
  
  // Extract all hrefs from <a> tags
  const hrefMatches = content.matchAll(/<a\s+[^>]*?href=["']([^"']+)["'][^>]*?>/gi);

  for (const match of hrefMatches) {
    const href = match[1].trim();
    totalCheckedLinks++;

    // Ignore anchors on current page, external, mailto, tel, javascript, etc.
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.startsWith('https://wa.me') ||
      href.startsWith('https://api.whatsapp.com') ||
      href.startsWith('https://cal.com')
    ) {
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.startsWith('https://gmdesign.in') && !href.startsWith('http://localhost')) {
        continue; // external link
      }
    }

    // Process internal path
    let urlPath = href.replace(/^https?:\/\/gmdesign\.in/, '');
    urlPath = urlPath.replace(/^http:\/\/localhost(:\d+)?/, '');
    
    // Split hash/query
    const [pathname] = urlPath.split(/[?#]/);
    if (!pathname || pathname === '') continue;

    // Check if target exists
    const cleanPath = pathname.replace(/\/$/, '');
    
    // Check possible file paths in dist:
    // 1. exact file
    // 2. pathname/index.html
    // 3. cleanPath + '.html'
    const targetFile1 = path.join(distDir, pathname);
    const targetFile2 = path.join(distDir, cleanPath, 'index.html');
    const targetFile3 = path.join(distDir, `${cleanPath}.html`);

    const exists =
      fs.existsSync(targetFile1) && fs.statSync(targetFile1).isFile() ||
      fs.existsSync(targetFile2) ||
      fs.existsSync(targetFile3) ||
      redirects.has(cleanPath);

    if (!exists) {
      console.error(`❌ BROKEN LINK in ${relPath}: "${href}" -> Path not found in dist`);
      errorsCount++;
    }
  }
}

console.log(`\nScan finished: checked ${totalCheckedLinks} link instances.`);
if (errorsCount > 0) {
  console.error(`❌ Failed: Found ${errorsCount} broken link(s)!`);
  process.exit(1);
} else {
  console.log(`✅ Success: All internal links are valid and resolve to existing HTML destinations.`);
}
