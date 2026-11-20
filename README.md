# GM Design — AI Services & Modern Web for Indian Businesses

> **Production rebuild of gmdesign.in** — AI-first, trust-first, fast, accessible, and completely free of hype buzzwords.

---

## 1. Overview & Business Goal

GM Design helps small and mid-size Indian businesses replace repetitive manual busywork with practical, reliable software:
- **Primary Offer:** **AI as a Service** (WhatsApp AI agents in English and Tamil, workflow automation connecting Sheets/Tally/CRMs, document & PO processing, and custom AI tools).
- **Secondary Offer:** **Proven Digital Services** (clean website design, local SEO & Google Business Profile, high-ROI social media ads, and branding identity).
- **Core Action:** Book a free 20-minute consultation (via Cal.com) or start a direct WhatsApp conversation.
- **Brand Position:** Direct, honest, plain-spoken, and trustworthy — like a good accounting firm that builds modern technology.

---

## 2. Tech Stack

- **Framework:** [Astro v5](https://astro.build/) (Static Site Generation / SSG).
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) with tokens mapped to semantic color palette.
- **Language:** TypeScript (`strict: true`).
- **Typography:** Self-hosted `Inter` (Latin) and `Noto Sans Tamil` in WOFF2 format in `/public/fonts/` (zero third-party font calls at runtime).
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) (Free tier).
- **Forms & Serverless Backend:** Cloudflare Pages Function at `functions/api/contact.ts` with Cloudflare Turnstile bot verification and transactional email delivery via [Resend](https://resend.com/).
- **Images:** WebP optimized images with explicit width and height attributes (zero cumulative layout shift).
- **Testing & Quality Assurance:** Playwright automated test suite for WCAG 2.2 AA accessibility, semantic landmarks, 360 px mobile responsiveness, link validation, and JS bundle size budgeting.

---

## 3. Site Structure & Routes (34 Static Pages)

```text
/                                   Home (13 conversion-focused sections)
/services/                          Services Hub (Block A: AI 70% + Block B: Web & Marketing)
/services/whatsapp-ai-agent/         WhatsApp AI Agent (Flagship)
/services/website-ai-assistant/     Website AI Assistant
/services/workflow-automation/      Workflow Automation (Sheets, Tally, CRM)
/services/document-order-processing/ Document & Order Extraction (Invoices & POs)
/services/custom-ai-apps/           Custom Internal AI Tools & Integrations
/services/ai-audit-training/        1-Week AI Audit & Team Training (Entry offer)
/services/website-design/           Website Design & Development
/services/catalog-ecommerce-websites/ Catalog & WhatsApp E-commerce
/services/seo-google-business-profile/ Local SEO & Google Business Profile
/services/social-media-ads/         Social Media Ads & Campaign Management
/services/branding-design/          Branding & Identity Design
/portfolio/                         Filterable Portfolio Grid (AI, Web, Branding, Print)
/portfolio/po-sentry/               PO Sentry automated purchase order processor
/portfolio/multi-agent-content/     Multi-Agent Content Pipeline
/portfolio/clinic-salon-booking-demo/ Bilingual Appointment Booking Demo
/portfolio/plsh-salon/              PLSH Salon Web Platform
/portfolio/tora-restaurant/         Tora Japanese Restaurant
/portfolio/muthu-digital-press/     Muthu Digital Press & Offset
/portfolio/lead-rehabs/             Lead Rehabs Physiotherapy Clinic
/portfolio/wordpress-website/       Boutique Salon WordPress Build
/portfolio/dharmik-gardens/         Dharmik Gardens Plant Nursery
/portfolio/silicon-embedded/        Silicon Embedded Systems
/portfolio/website-design/          V Labs Solutions Corporate Portal
/portfolio/elevation-works/         Commercial Architectural Elevation
/portfolio/circuits99/              Circuits99 Electronics eCommerce
/portfolio/bombay-gnanam-arts-academy/ Classical Arts Academy
/portfolio/relux-electric/          Relux Electric Mobility
/about/                             Founder story, 3 principles, what we will not do, facts table
/contact/                           6-field inquiry form, direct contacts, physical address
/privacy/                           Plain-language Privacy Policy (DPDP Act 2023 compliant)
/terms/                             Plain-language Terms of Service (milestone payments, 100% IP)
/404                                Accessible error recovery page
```

---

## 4. Key Design System Tokens

Colors are defined in `src/styles/tokens.css` and mapped to Tailwind utilities:

| Token | Hex | Role | Contrast Ratio |
|---|---|---|---|
| `ink` | `#0F172A` | Primary headings, dark accents | 14.8:1 on white (AAA) |
| `body` | `#334155` | Body text, explanations | 7.3:1 on white (AAA) |
| `surface` | `#FFFFFF` | Primary page background | — |
| `surface-soft`| `#F8FAFC` | Alternating section backgrounds | — |
| `border` | `#E2E8F0` | Card borders, dividers | Meets WCAG non-text |
| `accent` | `#2563EB` | Primary buttons, link highlights (Royal Cobalt) | 4.6:1 on white (AA) |
| `accent-hover`| `#1D4ED8` | Hover states | 7.2:1 on white (AAA) |
| `accent-soft` | `#EFF6FF` | Pill backgrounds, subtle callouts | — |

---

## 5. Zero-Fake-Facts Guarantee (`[[CONFIRM]]`)

To uphold **Rule 2 (No invented facts)**:
- Any number, client name, metric, or business detail not verified by the owner is wrapped as `[[CONFIRM: ...]]` or `<PlaceholderChip needed="..." />`.
- In development mode, placeholders render as prominent yellow warning chips.
- Run `npm run check:placeholders` to scan `src/` and automatically update [`OWNER_TODO.md`](./OWNER_TODO.md).
- Run `npm run check:placeholders:strict` in CI/CD to prevent accidental deployment with unverified facts.

---

## 6. Scripts & Quality Commands

```bash
# Start Astro local development server (runs at http://localhost:4321)
npm run dev

# Compile static site to ./dist/ (generates all 34 HTML files + sitemap)
npm run build

# Preview the production build locally
npm run preview

# Scan codebase for unconfirmed placeholders and synchronize OWNER_TODO.md
npm run check:placeholders

# Strict placeholder check (fails with exit code 1 if any [[CONFIRM]] remain)
npm run check:placeholders:strict

# Check all internal links across dist/ to verify zero broken links (404s)
npm run check:links

# Execute Playwright automated quality bar & accessibility suite (77 automated checks)
npm run test:quality

# Capture full multi-device screenshots (360px mobile, 768px tablet, 1280px desktop)
npm run test:screenshots
```

---

## 7. Cloudflare Pages Deployment Guide

Deploying `gmdesign.in` to Cloudflare Pages is completely automated and takes under 3 minutes:

### Step 1: Connect Git Repository
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository (`gmdesign.in`).

### Step 2: Configure Build Settings
- **Framework Preset:** `Astro`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js Version:** `20.x` or `22.x` (Add environment variable `NODE_VERSION = 22.19.0`)

### Step 3: Configure Environment Variables
Under **Settings** -> **Environment variables**, configure:

| Variable | Description | Example |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for delivering contact form emails | `re_123456789...` |
| `CONTACT_EMAIL` | Target inbox for new client inquiries | `contact@gmdesign.in` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key (widget rendering) | `0x4AAAAAA...` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (token verification) | `0x4AAAAAA...` |

### Step 4: Custom Domain
1. In Cloudflare Pages, go to **Custom domains** -> **Set up a domain**.
2. Enter `gmdesign.in` (and optionally `www.gmdesign.in`).
3. Cloudflare will automatically provision SSL/TLS certificates and point DNS.

---

## 8. Redirects & Legacy URL Preservation

All historical WordPress URLs (from the 2023 architecture/design site) are preserved with 301 permanent redirects in [`public/_redirects`](./public/_redirects):

- `/services-in-chennai/` &rarr; `/services/`
- `/graphic-design-services-in-chennai/` &rarr; `/services/branding-design/`
- `/branding-services-in-chennai/` &rarr; `/services/branding-design/`
- `/digital-branding-design-services-in-chennai/` &rarr; `/services/social-media-ads/`
- `/architecture-interior-design-design-services-in-chennai/` &rarr; `/portfolio/elevation-works/`
- `/projects/` &rarr; `/portfolio/`
- `/contact-us/` &rarr; `/contact/`
- `/about-1/` &rarr; `/about/`
- `/blog/*` &rarr; `/`
- Existing portfolio slugs (e.g. `/portfolio/plsh-salon/`, `/portfolio/elevation-works/`) maintain their exact original URLs.

---

## 9. Contact Form Function (`functions/api/contact.ts`)

The contact form uses a native Cloudflare Pages Function at `functions/api/contact.ts`:
1. **Honeypot Validation:** Automatically rejects bots filling out hidden form fields.
2. **Turnstile Verification:** Validates token against `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
3. **Resend Email API:** Sends a clean, structured HTML & text email notification to `contact@gmdesign.in` with client requirements, budget range, and phone number.
4. **Fallback:** If JavaScript is disabled or fails, the user can always reach out directly via the WhatsApp link or email listed on the contact page.

---

## 10. Verification Audit Results

- ✅ **Mobile-first Responsiveness:** Exact 360 px / 320 px compliance across all pages (0 px horizontal overflow).
- ✅ **Performance & Bundle Budget:** Total client-side JavaScript on Home page is **0.64 KB** (well within the 100 KB budget).
- ✅ **Accessibility (WCAG 2.2 AA):** All form fields labeled, skip link active, semantic landmarks present (`header`, `main`, `footer`), 1 `<h1>` per page.
- ✅ **Broken Links:** 1,932 link instances scanned across 34 HTML files, **0 broken links**.
- ✅ **SEO & Social:** Automated XML sitemap index, robots.txt, JSON-LD schemas (`ProfessionalService`, `Service`, `CreativeWork`, `FAQPage`, `BreadcrumbList`), and Open Graph card (`/og-image.png`).
