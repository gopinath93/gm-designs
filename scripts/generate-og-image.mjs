import sharp from 'sharp';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)" />

  <!-- Top Accent Bar -->
  <rect x="0" y="0" width="${width}" height="8" fill="url(#accent)" />

  <!-- Content Container with Frame -->
  <rect x="80" y="80" width="1040" height="470" rx="16" fill="none" stroke="#334155" stroke-width="2" opacity="0.6" />

  <!-- Brand Tag / Badge -->
  <g transform="translate(130, 140)">
    <rect width="180" height="36" rx="18" fill="#1E3A8A" />
    <text x="90" y="23" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#93C5FD" text-anchor="middle" letter-spacing="1">
      AI SERVICES FIRST
    </text>
  </g>

  <!-- Logo / Brand Name -->
  <text x="130" y="240" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="64" font-weight="800" fill="#FFFFFF" letter-spacing="-1">
    GM Design
  </text>

  <!-- Value Proposition Heading -->
  <text x="130" y="310" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="34" font-weight="600" fill="#E2E8F0">
    Practical AI as a Service &amp; Modern Websites
  </text>
  <text x="130" y="355" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="400" fill="#94A3B8">
    Built for Indian small and mid-size businesses. Plain language, real proof.
  </text>

  <!-- Pill features -->
  <g transform="translate(130, 420)">
    <text x="0" y="0" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="500" fill="#60A5FA">
      WhatsApp AI Agents &#8226; Workflow Automation &#8226; Document Processing &#8226; Web Design
    </text>
  </g>

  <!-- Footer Info -->
  <line x1="130" y1="475" x2="1070" y2="475" stroke="#334155" stroke-width="1" />
  <text x="130" y="510" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="600" fill="#64748B">
    gmdesign.in
  </text>
  <text x="1070" y="510" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="500" fill="#94A3B8" text-anchor="end">
    Book a free 30-minute call &#8226; 48-hour delivery on pilot demos
  </text>
</svg>
`;

async function generate() {
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/og-image.png');
  console.log('Generated public/og-image.png (1200x630)');
}

generate().catch(console.error);
