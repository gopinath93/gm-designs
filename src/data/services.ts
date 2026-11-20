export interface ServiceStep {
  step: string;
  title: string;
  duration: string;
  description: string;
}

export interface ServiceProof {
  hasCaseStudy: boolean;
  title: string;
  badge: 'Client project' | 'Pilot' | 'In-house prototype' | 'Demo' | 'Free Proof Demo';
  problem?: string;
  solution?: string;
  result: string;
  caseStudySlug?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface SubService {
  slug: string;
  serviceName: string;
  category: 'ai' | 'marketing';
  isAi: boolean;
  badge?: string;
  cardSummary: string;
  outcomeH1: string;
  whoThisIsFor: string;
  problemItSolves: string;
  whatYouGet: string[];
  howItWorks: ServiceStep[];
  timeAndPrice: {
    timeline: string;
    startingPrice: string;
    suggestedPrice: string;
    included: string[];
    notIncluded: string[];
  };
  proofBlock: ServiceProof;
  faqs: ServiceFAQ[];
}

export const servicesData: SubService[] = [
  // ==========================================
  // BLOCK A: AI SERVICES (Core, 70% Prominence)
  // ==========================================
  {
    slug: 'whatsapp-ai-agent',
    serviceName: 'WhatsApp AI Agent',
    category: 'ai',
    isAi: true,
    badge: 'Flagship Offer',
    cardSummary: 'Answers customer queries, takes bookings, qualifies leads, and hands over to human staff in Tamil and English.',
    outcomeH1: 'Never lose a customer inquiry while you sleep',
    whoThisIsFor: 'For Indian retailers, clinics, manufacturers, exporters, and service businesses receiving 20+ customer messages a day on WhatsApp.',
    problemItSolves: 'Customers message late at night or during rush hours. When no one replies within 5 minutes, they message your competitor. Answering the same 10 pricing questions wastes hours of your staff’s time every day.',
    whatYouGet: [
      'Official WhatsApp Cloud API setup verified on your business number',
      'AI assistant trained on your specific product list, prices, service catalog, and FAQs',
      'Tamil and English language conversation support (Tamil script and everyday Tanglish)',
      'Automated customer qualification and appointment or order logging into Google Sheets',
      'Instant human handover: alerts your staff on WhatsApp when a human touch is needed',
      'PDF and image sharing: automatically sends price sheets, brochures, or location cards',
      '14 days of supervised fine-tuning after launch to review real customer chat logs',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Review your chat history',
        duration: 'Day 1 to 2',
        description: 'You share your top 20 customer questions, price list, and past sample WhatsApp chats.',
      },
      {
        step: '02',
        title: 'Build knowledge & safeguards',
        duration: 'Day 3 to 7',
        description: 'We configure the agent with strict boundaries: it only answers from your data and never invents prices.',
      },
      {
        step: '03',
        title: 'Test with your team',
        duration: 'Day 8 to 10',
        description: 'Your team tests the agent on private numbers. You test tough questions before real customers touch it.',
      },
      {
        step: '04',
        title: 'Live rollout & monitoring',
        duration: 'Day 11 onwards',
        description: 'We connect your live WhatsApp line. We monitor all conversations for the first two weeks and tune responses.',
      },
    ],
    timeAndPrice: {
      timeline: '1 to 2 weeks to go live',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹25,000 setup + ₹4,000/month',
      included: [
        'Complete agent build and training',
        'Google Sheets integration for lead logging',
        'Staff training walkthrough (30 minutes)',
        'Monthly prompt maintenance and error monitoring',
      ],
      notIncluded: [
        'Meta WhatsApp conversation fees (billed directly to your Meta account at cost)',
        'AI token costs (typically ₹300 to ₹1,200/month depending on message volume)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'po-sentry',
      title: 'WhatsApp Buyer-Query Agent ("PO Sentry")',
      badge: 'In-house prototype',
      problem: 'Export buyers across international time zones repeatedly asked staff for purchase order status, fabric GSM specs, and lab dip updates.',
      solution: 'Custom WhatsApp agent linked to order tracking sheet that returns status and dispatches spec PDFs in under 5 seconds.',
      result: '[[CONFIRM: verified metric / hours saved]]',
    },
    faqs: [
      {
        question: 'Will the WhatsApp AI agent make up wrong prices?',
        answer: 'No. We configure strict prompt safeguards and factual groundings. The agent is instructed to answer only from your approved price sheets. If a customer asks something not in its files, it replies: "Let me check with our manager" and immediately notifies your team.',
      },
      {
        question: 'Does it support Tamil and Tanglish?',
        answer: 'Yes. It understands pure Tamil (தமிழ்), English, and everyday Tanglish (Tamil written in English alphabet, e.g., "Price evlo irukku?"). Customers feel comfortable speaking naturally.',
      },
      {
        question: 'Do I lose my personal WhatsApp chats?',
        answer: 'We recommend running the assistant on your official WhatsApp Business number using the Meta Cloud API. We guide you step-by-step through keeping or separating your personal chats.',
      },
      {
        question: 'What happens if a customer asks to speak with a human?',
        answer: 'The agent immediately pauses automatic replies for that customer and sends an alert with the customer’s phone number to your staff’s mobile so you can take over the conversation.',
      },
    ],
  },

  {
    slug: 'website-ai-assistant',
    serviceName: 'Website AI Assistant',
    category: 'ai',
    isAi: true,
    cardSummary: 'A fast, trustworthy chat assistant trained on your own website, services, prices, and catalogs.',
    outcomeH1: 'Turn website visitors into booked appointments and phone calls',
    whoThisIsFor: 'For businesses with an active website whose visitors read pages but leave without filling out the contact form.',
    problemItSolves: 'Traditional website forms feel like sending an email into a black hole. Visitors have 1 or 2 quick questions before buying. If they can’t find the answer in 30 seconds, they hit the back button.',
    whatYouGet: [
      'Custom website chat assistant that matches your brand colors and font',
      'Trained exclusively on your services, pricing guidelines, case studies, and FAQs',
      'Lead capture trigger: politely asks for customer name and WhatsApp number before answering complex quotes',
      'Direct WhatsApp notification to your sales team whenever a visitor requests a callback',
      'Zero layout shift, lightweight script (under 30 KB, no impact on page speed)',
      'Weekly report of the top questions visitors asked on your website',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Extract content',
        duration: '1 day',
        description: 'We crawl your existing website, PDF catalogs, and brochures to create the verified knowledge base.',
      },
      {
        step: '02',
        title: 'Configure tone & lead capture',
        duration: '2 to 3 days',
        description: 'We set up conversation guardrails and the exact criteria for when it asks for the visitor’s phone number.',
      },
      {
        step: '03',
        title: 'Embed and test',
        duration: '1 day',
        description: 'One single line of code added to your website (WordPress, custom HTML, Shopify, or Webflow).',
      },
      {
        step: '04',
        title: 'Review & optimize',
        duration: 'Ongoing',
        description: 'We review unhandled questions weekly and update the assistant’s answers.',
      },
    ],
    timeAndPrice: {
      timeline: '5 to 7 working days',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹20,000 setup + ₹3,000/month',
      included: [
        'Knowledge base curation from your site & docs',
        'Custom widget styling and mobile responsive layout',
        'Direct email or WhatsApp lead alerts',
        'Monthly log audits and content updates',
      ],
      notIncluded: [
        'AI model token costs (typically ₹200 to ₹800/month)',
      ],
    },
    proofBlock: {
      hasCaseStudy: false,
      title: 'Free 30-Minute Demo on Your Website',
      badge: 'Free Proof Demo',
      result: 'Send us your website URL. Within 24 hours, we will send you a private test link with an AI assistant answering questions from your own pages.',
    },
    faqs: [
      {
        question: 'Will this chat widget slow down my website?',
        answer: 'No. The script loads asynchronously after your page has finished rendering. It weighs under 30 KB and has zero negative impact on your Google Core Web Vitals or SEO scores.',
      },
      {
        question: 'Can visitors spam the chat widget?',
        answer: 'We implement strict rate limits and IP throttling so bots or competitors cannot run up your AI token usage.',
      },
      {
        question: 'Does it work on WordPress or custom websites?',
        answer: 'Yes. It works with any website platform: WordPress, Shopify, Next.js, Astro, Webflow, or plain HTML.',
      },
      {
        question: 'Where do the visitor leads go?',
        answer: 'Every captured lead (Name, Phone/WhatsApp, Question) is sent instantly to your team’s email or WhatsApp group, and logged into Google Sheets.',
      },
    ],
  },

  {
    slug: 'workflow-automation',
    serviceName: 'Workflow Automation',
    category: 'ai',
    isAi: true,
    cardSummary: 'Connect WhatsApp, forms, Google Sheets, Tally, CRM, and email so nobody wastes hours re-typing data.',
    outcomeH1: 'Stop copying numbers between WhatsApp, spreadsheets and Tally',
    whoThisIsFor: 'For business owners whose office staff spend 2 or more hours daily doing manual data entry, reminders, and cross-checking.',
    problemItSolves: 'Orders arrive on WhatsApp, leads arrive from forms, invoices live in Tally, and customer lists live in Excel. Someone spends all afternoon copying and pasting rows. Typos happen and payments are delayed.',
    whatYouGet: [
      'Custom workflow automation built using n8n, Make, or lightweight Python scripts',
      'Automatic lead synchronization: website and WhatsApp leads pushed into your Google Sheet or CRM instantly',
      'Automated payment reminders sent via WhatsApp or email before due dates',
      'Daily owner summary: an automated message at 7 PM showing today’s new leads, orders, and pending tasks',
      'Error handling and alert system: you get notified if an external service fails',
      'Full documentation and flowcharts so you understand every step',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Bottleneck audit',
        duration: 'Day 1 to 2',
        description: 'We map your exact manual steps: where data starts, who copies it, and where it needs to end up.',
      },
      {
        step: '02',
        title: 'Build the bridge',
        duration: 'Day 3 to 6',
        description: 'We connect your tools securely with automated triggers and data validation.',
      },
      {
        step: '03',
        title: 'Side-by-side run',
        duration: 'Day 7 to 10',
        description: 'We run the automation in parallel with your manual process to verify 100% accuracy.',
      },
      {
        step: '04',
        title: 'Handover & monitoring',
        duration: 'Day 11 onwards',
        description: 'Your team stops doing the manual chore. We monitor automation health continuously.',
      },
    ],
    timeAndPrice: {
      timeline: '1 to 2 weeks per workflow',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹15,000 per workflow',
      included: [
        'Complete workflow build and testing',
        'Error alert setup to your email/WhatsApp',
        'Staff demonstration and 1-page process manual',
        '30 days of post-launch warranty and bug fixes',
      ],
      notIncluded: [
        'Third-party software subscriptions (e.g. Make.com, Zapier, or Cloud hosting fees if self-hosted)',
      ],
    },
    proofBlock: {
      hasCaseStudy: false,
      title: 'Free Workflow Feasibility Review',
      badge: 'Free Proof Demo',
      result: 'Tell us the most repetitive 1-hour task your team does every day. On a 30-minute call, we will tell you if it can be automated and exactly what it costs.',
    },
    faqs: [
      {
        question: 'Do I need expensive monthly software like Zapier?',
        answer: 'Not necessarily. Wherever possible, we use cost-effective alternatives like n8n (which can be hosted for under ₹400/month) or direct lightweight API scripts so your monthly overhead stays tiny.',
      },
      {
        question: 'What happens if an API connection goes down?',
        answer: 'We build automatic retry mechanisms and an instant error alert that notifies our team and yours if any sync fails, ensuring zero data loss.',
      },
      {
        question: 'Can you connect with Tally or my local billing software?',
        answer: 'Yes. If your software supports XML/ODBC exports or cloud API bridges, we can extract invoice data and sync it automatically.',
      },
      {
        question: 'Do we need technical people on our payroll?',
        answer: 'No. The workflows run silently in the background. Your staff continues using simple spreadsheets and WhatsApp.',
      },
    ],
  },

  {
    slug: 'document-order-processing',
    serviceName: 'Document & Order Processing',
    category: 'ai',
    isAi: true,
    cardSummary: 'Read PDFs, invoices, purchase orders, and enquiry messages, pull out the data, and update your sheets or ERP.',
    outcomeH1: 'Turn supplier PDFs and customer purchase orders into clean spreadsheet rows automatically',
    whoThisIsFor: 'For exporters, distributors, manufacturers, and logistics firms handling dozens of purchase orders, shipping bills, or supplier invoices weekly.',
    problemItSolves: 'Purchase orders arrive as scanned PDFs, images, or WhatsApp text. Staff spend hours typing item numbers, quantities, rates, and GST numbers into Excel. Mistakes lead to wrong shipments and accounting disputes.',
    whatYouGet: [
      'Document AI pipeline configured to read your industry’s specific invoice and PO formats',
      'Automated data extraction: buyer name, PO number, line items, quantities, rates, tax, and delivery dates',
      'Validation checks: flags price discrepancies or missing mandatory fields automatically',
      'Direct output into your Google Sheet, Excel, or ERP database',
      'Handles messy scans, multi-page PDFs, and WhatsApp photo attachments',
      'Human review screen for any document where confidence is below 95%',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Sample document audit',
        duration: 'Day 1 to 3',
        description: 'You send us 15 to 20 past sample invoices or POs representing your typical formats.',
      },
      {
        step: '02',
        title: 'Model tuning & schema setup',
        duration: 'Day 4 to 8',
        description: 'We train the extraction schema to recognize your exact line-item tables and tax fields.',
      },
      {
        step: '03',
        title: 'Accuracy benchmark',
        duration: 'Day 9 to 12',
        description: 'We test on unseen test documents to ensure 99%+ extraction precision.',
      },
      {
        step: '04',
        title: 'Live workflow deployment',
        duration: 'Day 13 onwards',
        description: 'Set up an email or WhatsApp dropbox where staff simply forward PDFs to be processed.',
      },
    ],
    timeAndPrice: {
      timeline: '2 to 3 weeks',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹40,000 setup',
      included: [
        'Document parsing pipeline for up to 3 core document formats',
        'Output spreadsheet / database sync',
        'Validation rule engine and human exception flags',
        '30 days post-launch refinement',
      ],
      notIncluded: [
        'OCR / Vision AI API costs (typically ₹0.10 to ₹0.50 per processed page billed at cost)',
      ],
    },
    proofBlock: {
      hasCaseStudy: false,
      title: 'Free 3-Document Extraction Test',
      badge: 'Free Proof Demo',
      result: 'Send us 3 sample past purchase orders or invoices (redact confidential details if needed). We will extract the data into an Excel sheet to demonstrate speed and accuracy.',
    },
    faqs: [
      {
        question: 'Does it work on scanned or photographed paper documents?',
        answer: 'Yes. Modern Vision models handle angled photos, smartphone camera snaps, and low-resolution PDF scans with high accuracy.',
      },
      {
        question: 'What if a supplier uses a completely new layout?',
        answer: 'Our AI model extracts semantic entities (like "Grand Total" or "HSN Code") by meaning rather than rigid coordinates. If it encounters an ambiguous field, it tags it for a 5-second human confirmation.',
      },
      {
        question: 'Is my financial data kept confidential?',
        answer: 'Yes. We use private enterprise endpoints where your documents are processed strictly in transit and never stored or used to train public models.',
      },
      {
        question: 'Can this push directly into Tally?',
        answer: 'Yes, we can generate Tally-compatible XML import files or sync directly through automated import utilities.',
      },
    ],
  },

  {
    slug: 'custom-ai-apps',
    serviceName: 'Custom AI Tools & Integrations',
    category: 'ai',
    isAi: true,
    cardSummary: 'Internal knowledge assistants over company files, automated report writers, and custom API tools.',
    outcomeH1: 'Give your team instant answers from your internal documents and past records',
    whoThisIsFor: 'For growing businesses with extensive product catalogs, engineering specs, compliance manuals, or internal procedures that staff struggle to search.',
    problemItSolves: 'New employees take months to learn internal policies. Senior managers waste hours answering the same questions about past quotes or machine operating specs. Crucial company knowledge is scattered across old emails and folders.',
    whatYouGet: [
      'Private internal knowledge assistant that searches company PDFs, handbooks, and past project files',
      'Strict source citations: every answer quotes the exact document title and page number',
      'Role-based permissions: restrict sensitive financial or HR folders to authorized staff only',
      'Custom report or quotation generators that draft first passes in your company format',
      'Secure web dashboard or internal WhatsApp bot accessible only to your employees',
      'Full administrative control to add or remove documents anytime',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Document audit & security setup',
        duration: 'Week 1',
        description: 'We organize your internal files and establish access controls and security protocols.',
      },
      {
        step: '02',
        title: 'Indexing & testing',
        duration: 'Week 2',
        description: 'We build semantic search embeddings with verified source attribution.',
      },
      {
        step: '03',
        title: 'Team trial',
        duration: 'Week 3',
        description: 'Your team tests queries and identifies edge cases in a private staging workspace.',
      },
      {
        step: '04',
        title: 'Production rollout',
        duration: 'Week 4',
        description: 'Deployment across internal staff tools with training and usage monitoring.',
      },
    ],
    timeAndPrice: {
      timeline: '2 to 4 weeks',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹50,000 fixed milestone',
      included: [
        'Secure private knowledge base setup',
        'Source-attribution answering engine',
        'Staff onboarding training session',
        'Full source code and ownership transfer',
      ],
      notIncluded: [
        'Cloud hosting and embedding API costs (typically ₹500 to ₹2,000/month)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'multi-agent-content',
      title: 'Multi-Agent Content & Fact Pipeline',
      badge: 'In-house prototype',
      problem: 'Drafting structured technical documentation without factual hallucinations required excessive senior review time.',
      solution: 'Three-agent Python/FastAPI pipeline with a hard rewrite cap that verifies claims against trusted local source docs.',
      result: '[[CONFIRM: e.g. posts per week, time saved]]',
    },
    faqs: [
      {
        question: 'Can competitors or external users see our internal files?',
        answer: 'Never. Custom tools are deployed behind enterprise authentication (Google Workspace SSO or secure employee logins) and never exposed publicly.',
      },
      {
        question: 'Does the AI ever invent answers to technical questions?',
        answer: 'No. The assistant is constrained by strict citation logic: if the answer is not present in your uploaded documents, it explicitly states "Information not found in company records".',
      },
      {
        question: 'Who owns the custom software and prompts?',
        answer: 'You own 100% of the code, prompts, and architecture. We provide all source repositories and setup instructions.',
      },
      {
        question: 'Can we add new PDFs ourselves after launch?',
        answer: 'Yes. We build simple upload folders (e.g. connected to your Google Drive) where dropping a new PDF automatically indexes it into the assistant.',
      },
    ],
  },

  {
    slug: 'ai-audit-training',
    serviceName: 'AI Audit & Team Training',
    category: 'ai',
    isAi: true,
    badge: 'Entry Offer',
    cardSummary: 'Fixed-fee 1-week review: where AI will save time and money, ranked with cost. Low-risk first purchase.',
    outcomeH1: 'Find where AI will actually save your business time and money before spending a rupee',
    whoThisIsFor: 'For business owners who hear about AI every day but don’t know what is hype, what is practical, or where to start without wasting money.',
    problemItSolves: 'Most businesses waste money subscribing to random AI apps or hiring agencies who promise miracles. You need an honest, vendor-neutral audit of your actual operations before spending capital on custom software.',
    whatYouGet: [
      '1-on-1 operational audit: we examine where your staff spends repetitive hours each week',
      'Ranked AI Opportunity Matrix: 3 to 5 concrete automation opportunities ranked by ROI and ease of implementation',
      'Vendor-neutral tool recommendations: clear guidance on off-the-shelf free/cheap tools vs. custom builds',
      'Realistic cost & time projections for each proposed fix (no inflated agency estimates)',
      'A 1-hour live practical training session for you and your core office staff',
      'One follow-up review call 30 days later to check your progress',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Intake interview',
        duration: 'Day 1 (45 min)',
        description: 'We review your daily business workflow, team structure, and software tools.',
      },
      {
        step: '02',
        title: 'Task & time audit',
        duration: 'Day 2 to 3',
        description: 'We inspect sample communications, documents, and manual bottlenecks.',
      },
      {
        step: '03',
        title: 'Written findings report',
        duration: 'Day 4',
        description: 'We deliver a plain-English 5-page report with ranked recommendations and exact costs.',
      },
      {
        step: '04',
        title: 'Team training & Q&A',
        duration: 'Day 5 (60 min)',
        description: 'Hands-on walkthrough with your team to demonstrate immediate time-saving workflows.',
      },
    ],
    timeAndPrice: {
      timeline: 'Exactly 5 working days',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: '₹7,500 to ₹15,000 fixed',
      included: [
        'Complete written audit and ROI roadmap',
        '60-minute practical team workshop',
        '30-day follow-up consultation call',
        'Credit towards future build: 50% of audit fee credited if you hire us to build an automation',
      ],
      notIncluded: [
        'Custom software development (evaluated separately if you choose to proceed)',
      ],
    },
    proofBlock: {
      hasCaseStudy: false,
      title: 'Zero-Risk Guarantee',
      badge: 'Free Proof Demo',
      result: 'If our written audit does not identify at least 5 hours of weekly time savings for your business, we refund 100% of your audit fee on the spot with no questions asked.',
    },
    faqs: [
      {
        question: 'Why should I pay for an audit instead of jumping straight into building?',
        answer: 'Because building the wrong tool is expensive. In over half the businesses we speak with, a simple free tool, spreadsheet tweak, or standard WhatsApp setting already solves their problem without any custom software.',
      },
      {
        question: 'What size company is this audit suited for?',
        answer: 'It is built specifically for Indian small and mid-sized businesses with 2 to 50 employees where the founder or general manager wants clear, practical clarity.',
      },
      {
        question: 'Is the audit conducted in person or online?',
        answer: 'We conduct audits remotely via Google Meet / Zoom and WhatsApp screen-shares across India, or in-person if located in our home city.',
      },
      {
        question: 'Are you going to pitch us expensive software at the end?',
        answer: 'No. Our primary job in the audit is to be honest. If AI is not the right fit for a bottleneck, we state it in writing. If you want us to build an automation afterwards, 50% of your audit fee is credited towards the project.',
      },
    ],
  },

  // ==========================================
  // BLOCK B: WEBSITES & MARKETING (Proven Work)
  // ==========================================
  {
    slug: 'website-design',
    serviceName: 'Website Design & Development',
    category: 'marketing',
    isAi: false,
    cardSummary: 'Fast, clear, trustworthy websites built for conversions. WordPress or custom Astro code.',
    outcomeH1: 'A fast, clean website that makes Indian business owners trust you immediately',
    whoThisIsFor: 'For established Indian businesses with outdated, slow, or broken websites that fail to generate phone calls and customer enquiries.',
    problemItSolves: 'Most business websites are packed with confusing buzzwords, slow stock photos, and broken mobile menus. Prospective clients visit, feel uneasy about whether the business is real, and leave without calling.',
    whatYouGet: [
      'Custom website design focused on speed, credibility, and clear calls to action',
      'Mobile-first responsive layout tested across 360 px, 768 px, and 1280 px screens',
      'Sub-2-second load times on mobile 4G connections',
      'Direct WhatsApp and click-to-call buttons for instant customer contact',
      'Complete on-page SEO, schema markup, and Google Search Console submission',
      'Zero cookie banner hassles: fast, privacy-friendly analytics with zero tracking cookies',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Structure & copywriting',
        duration: 'Week 1',
        description: 'We write clear, plain-language copy that answers your buyers’ top 3 questions immediately.',
      },
      {
        step: '02',
        title: 'Design & mobile layout',
        duration: 'Week 2',
        description: 'We design high-contrast, clean page layouts and confirm them with you.',
      },
      {
        step: '03',
        title: 'Development & testing',
        duration: 'Week 3',
        description: 'We build with fast, lightweight code and test across iPhones and Android devices.',
      },
      {
        step: '04',
        title: 'Launch & Google setup',
        duration: 'Week 4',
        description: 'We connect your custom domain, set up SSL security, and submit your site to Google.',
      },
    ],
    timeAndPrice: {
      timeline: '2 to 4 weeks',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹25,000 for standard business sites',
      included: [
        'Complete design, copywriting assistance, and development',
        'Mobile optimization and speed testing',
        'On-page SEO and SSL security configuration',
        '1 year of basic technical maintenance included',
      ],
      notIncluded: [
        'Domain registration and annual hosting fees (typically ₹1,500 to ₹3,500/year at cost)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'muthu-digital-press',
      title: 'Muthu Digital Press Website',
      badge: 'Client project',
      problem: 'Commercial printing facility in Chennai needed a clear web presence to showcase equipment capabilities and attract print orders.',
      solution: 'Clean, mobile-first business website showcasing print machinery, service categories, and direct quotation requests.',
      result: '[[CONFIRM: verified metric / inquiries increase]]',
    },
    faqs: [
      {
        question: 'Do you use WordPress or custom code?',
        answer: 'We build using both. For clients who want an easy blogging interface, we build clean, lightweight WordPress themes. For clients who want maximum speed and zero security headaches, we build modern static Astro websites.',
      },
      {
        question: 'Will our website work properly on cheap Android phones?',
        answer: 'Yes. We design mobile-first at 360 px width and test specifically for lightweight performance on standard Indian 4G mobile connections.',
      },
      {
        question: 'Who owns the website and domain?',
        answer: 'You own everything 100%. We register all domains and hosting in your name. You never have to worry about an agency locking you out.',
      },
      {
        question: 'Can we update text and photos ourselves later?',
        answer: 'Yes. We provide clear 5-minute video tutorials showing you exactly how to update text, photos, and contact information without touching any code.',
      },
    ],
  },

  {
    slug: 'catalog-ecommerce-websites',
    serviceName: 'Catalog & E-commerce Websites',
    category: 'marketing',
    isAi: false,
    cardSummary: 'Product showcase, PDF catalogs, and direct WhatsApp enquiry flows. Ideal for manufacturers and exporters.',
    outcomeH1: 'Show your products clearly and take customer orders directly on WhatsApp',
    whoThisIsFor: 'For manufacturers, wholesalers, exporters, and B2B traders with extensive product catalogs who want buyer inquiries, not complicated cart checkouts.',
    problemItSolves: 'Most Indian B2B buyers and exporters do not want to register accounts or checkout through complicated cart forms. They want to see product specs, download a clean PDF catalog, and chat directly with sales on WhatsApp.',
    whatYouGet: [
      'Structured digital product catalog organized by category, specifications, and SKU',
      'One-click "Enquire on WhatsApp" button pre-filled with the exact product name and code',
      'Downloadable PDF catalog generator for buyers to view offline',
      'Search and filter by material, dimensions, grade, or minimum order quantity (MOQ)',
      'High-resolution product photo galleries optimized for fast mobile loading',
      'Inquiry logging: every product click tracks directly into your sales sheet',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Product data collection',
        duration: 'Week 1',
        description: 'We organize your product photos, descriptions, specs, and price/MOQ lists in a clean sheet.',
      },
      {
        step: '02',
        title: 'Catalog layout design',
        duration: 'Week 2',
        description: 'We build a fast, filterable product grid with clear specification tables.',
      },
      {
        step: '03',
        title: 'WhatsApp flow integration',
        duration: 'Week 3',
        description: 'We connect each product inquiry button to pre-fill the product name in your sales WhatsApp.',
      },
      {
        step: '04',
        title: 'Testing & launch',
        duration: 'Week 4',
        description: 'Testing across devices and buyer pathways before publishing.',
      },
    ],
    timeAndPrice: {
      timeline: '3 to 4 weeks',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹35,000 for catalog sites',
      included: [
        'Complete catalog structure and product upload for up to 50 items',
        'Automated WhatsApp inquiry integration',
        'PDF catalog download feature',
        'Staff training on how to add new products',
      ],
      notIncluded: [
        'Payment gateway integration (optional add-on if you want online credit card checkout)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'silicon-embedded',
      title: 'Silicon Embedded Product Showcase',
      badge: 'Client project',
      problem: 'Embedded electronics manufacturer needed a structured technical catalog for industrial microcontrollers and hardware modules.',
      solution: 'Engineered a clean product showcase with detailed technical datasheets, pin diagrams, and direct inquiry buttons.',
      result: '[[CONFIRM: verified metric]]',
    },
    faqs: [
      {
        question: 'Do buyers pay online on the website?',
        answer: 'For B2B and export businesses, most transactions happen via proforma invoices, bank transfers, or custom quotes. We route buyers directly to WhatsApp or phone with the product pre-selected. Online payment gateway integration is available if you sell direct-to-consumer.',
      },
      {
        question: 'How easy is it to add 20 new products next month?',
        answer: 'Very easy. We build intuitive backend dashboards where uploading a new photo and typing the price takes under 2 minutes.',
      },
      {
        question: 'Can buyers download our entire catalog as a PDF?',
        answer: 'Yes. We include a direct PDF catalog download button so buyers can save and share your specs with their procurement teams.',
      },
      {
        question: 'Can we hide prices from competitors?',
        answer: 'Yes. You can choose to display prices publicly or show an "Enquire for Wholesale Pricing" button that requires buyer contact.',
      },
    ],
  },

  {
    slug: 'seo-google-business-profile',
    serviceName: 'SEO & Google Business Profile',
    category: 'marketing',
    isAi: false,
    cardSummary: 'Local search rankings, Google Maps optimization, and on-page technical SEO to drive customer calls.',
    outcomeH1: 'Get your business found on Google Maps and local search when customers need you',
    whoThisIsFor: 'For clinics, retail stores, local manufacturers, contractors, and service companies looking for inbound calls from their city.',
    problemItSolves: 'When local customers search "best [service] near me", your competitors show up in the Google Maps top 3 pack. Your listing is unverified, missing photos, or buried on page 3 of search results.',
    whatYouGet: [
      'Complete Google Business Profile (Maps) optimization and verification guidance',
      'Local search audit: targeted high-intent keywords your actual customers search for in your city',
      'On-page technical SEO: meta titles, descriptions, schema markup, and mobile speed fixes',
      'Review generation strategy: automated WhatsApp prompts to collect genuine 5-star Google reviews from happy clients',
      'Local directory citations and consistent NAP (Name, Address, Phone) across Indian business directories',
      'Monthly search performance report showing calls, direction requests, and website visits',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Local ranking audit',
        duration: 'Week 1',
        description: 'We analyze your current Google Maps ranking and identify competitor keyword gaps in your area.',
      },
      {
        step: '02',
        title: 'Profile & website optimization',
        duration: 'Week 2',
        description: 'We update your categories, service menus, photos, and on-page website location signals.',
      },
      {
        step: '03',
        title: 'Citations & review campaign',
        duration: 'Week 3 to 4',
        description: 'We clean up directory listings and launch an ethical review collection flow.',
      },
      {
        step: '04',
        title: 'Monthly tracking & updates',
        duration: 'Ongoing',
        description: 'We post regular Google updates, monitor ranking movements, and track inbound call volume.',
      },
    ],
    timeAndPrice: {
      timeline: 'Initial setup in 2 weeks; ranking results in 60 to 90 days',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹12,000/month retainer',
      included: [
        'Google Business Profile setup and weekly management',
        'Website technical SEO fixes',
        'Local citation building',
        'Transparent monthly performance reports',
      ],
      notIncluded: [
        'Paid Google Ads (managed separately under Social Media & Ads)',
      ],
    },
    proofBlock: {
      hasCaseStudy: false,
      title: 'Free Google Maps Ranking Audit',
      badge: 'Free Proof Demo',
      result: 'Tell us your business name and city. Within 24 hours, we will send you a report showing where you rank in your local area for top customer search terms.',
    },
    faqs: [
      {
        question: 'How long does it take to see more phone calls from Google Maps?',
        answer: 'For established profiles with basic optimizations, improvements often show within 30 to 45 days. Competitive search categories typically take 60 to 90 days of consistent review growth and profile activity.',
      },
      {
        question: 'Do you buy fake Google reviews?',
        answer: 'Never. Buying fake reviews violates Google policy and can get your listing permanently suspended. We set up automated WhatsApp workflows that ask your real, satisfied customers for honest reviews at the moment they are happiest.',
      },
      {
        question: 'Will this help if we don’t have a physical retail storefront?',
        answer: 'Yes. Service-area businesses (e.g. contractors, wholesale suppliers, consultants) can target specific cities without publicly showing a residential address.',
      },
      {
        question: 'Do you guarantee number 1 ranking?',
        answer: 'No honest SEO agency guarantees number 1 on Google because Google updates algorithms constantly. We guarantee strict adherence to Google guidelines, transparent work logs, and measured growth in calls and inquiries.',
      },
    ],
  },

  {
    slug: 'social-media-ads',
    serviceName: 'Social Media & Ads',
    category: 'marketing',
    isAi: false,
    cardSummary: 'Targeted local Meta and Google ad campaigns with clear ROAS and monthly lead reports.',
    outcomeH1: 'Targeted local ads and clean social content that bring qualified customer enquiries',
    whoThisIsFor: 'For businesses wanting predictable, paid inbound leads from Meta (Facebook & Instagram) and Google Ads without blowing budget on clicks that don’t buy.',
    problemItSolves: 'Most business owners waste ₹20,000 to ₹50,000 clicking "Boost Post" on Instagram. They get hundreds of random likes, but zero qualified customer enquiries or phone calls.',
    whatYouGet: [
      'Full campaign architecture targeting your exact customer demographics, city, and purchasing intent',
      'Ad creatives: high-contrast graphic banners, product videos, and direct offer copy',
      'Direct WhatsApp click-to-chat ads that bring leads straight to your sales team',
      'Meta Pixel and Google conversion tracking setup on your website for accurate attribution',
      'A/B split testing of headlines and offers to lower your cost-per-lead (CPL)',
      'Transparent weekly reporting: exactly how much was spent, how many leads arrived, and cost per lead',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Audience & offer strategy',
        duration: 'Week 1',
        description: 'We define your target buyer, geographic radius, and craft a compelling, clear offer.',
      },
      {
        step: '02',
        title: 'Creative design & tracking setup',
        duration: 'Week 2',
        description: 'We produce ad banners and configure conversion pixels on your landing page and WhatsApp.',
      },
      {
        step: '03',
        title: 'Launch & budget calibration',
        duration: 'Week 3',
        description: 'We launch test campaigns with modest budgets to identify top-performing creatives.',
      },
      {
        step: '04',
        title: 'Scale & optimize',
        duration: 'Ongoing',
        description: 'We double down on profitable ad sets and prune low-converting audiences.',
      },
    ],
    timeAndPrice: {
      timeline: 'Campaign setup in 7 to 10 days',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹15,000/month management fee',
      included: [
        'Ad strategy, copywriting, and banner creative design',
        'Full tracking setup and conversion testing',
        'Daily ad budget optimization and audience tuning',
        'Weekly WhatsApp lead summary and monthly performance call',
      ],
      notIncluded: [
        'Ad spend paid directly to Meta or Google (we recommend starting with at least ₹10,000 to ₹25,000/month ad budget)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'relux-electric',
      title: 'Relux Electric EV Social Campaign',
      badge: 'Client project',
      problem: 'Electric vehicle charging infrastructure company needed targeted social creatives to build local brand awareness and commercial enquiries.',
      solution: 'Designed branded social creatives and targeted regional ad campaigns highlighting EV charging accessibility.',
      result: '[[CONFIRM: verified metric / campaign engagement]]',
    },
    faqs: [
      {
        question: 'How much should I spend on ads every month?',
        answer: 'For a local city campaign, we recommend starting with an ad budget of ₹10,000 to ₹20,000 per month paid directly to Meta or Google. Once we find winning ads that generate profitable leads, you can scale budget with confidence.',
      },
      {
        question: 'Who pays the ad budget?',
        answer: 'You pay Meta and Google directly using your own company credit card or GST invoice account. We never mark up your ad spend; you pay only our transparent management fee.',
      },
      {
        question: 'Can you route ad clicks straight to WhatsApp?',
        answer: 'Yes. WhatsApp click-to-chat ads are often the highest-converting format in India because customers can start a conversation immediately without waiting for an email reply.',
      },
      {
        question: 'Do you create the ad images and graphics?',
        answer: 'Yes. All graphic design, copy drafting, and banner resizing for Instagram, Facebook, and Google are included in our monthly service.',
      },
    ],
  },

  {
    slug: 'branding-design',
    serviceName: 'Branding & Graphic Design',
    category: 'marketing',
    isAi: false,
    cardSummary: 'Logo, brand identity, print collateral, and social creatives that make your company look established.',
    outcomeH1: 'Professional logos, catalogs and brand identity that make your business look established',
    whoThisIsFor: 'For new ventures launching in India or established family businesses upgrading their image to compete with modern national brands.',
    problemItSolves: 'Cheap ₹1,000 logo designs and mismatched print materials make prospective clients question your legitimacy. Professional branding signals reliability, stability, and high quality before you even begin speaking.',
    whatYouGet: [
      'Core brand identity: primary logo, secondary marks, typography system, and color palette',
      'Print collateral: visiting cards, letterheads, envelopes, and packaging stickers',
      'Marketing collateral: product brochures, presentation templates, and roll-up standees',
      'Digital assets: social media display pictures, banner templates, and email signature designs',
      'Comprehensive Brand Guidelines PDF: rules on correct font usage, colors (CMYK/RGB/Pantone), and logo clear space',
      'Full master file handover: vector AI, EPS, SVG, and high-res PNG/PDF files with complete copyright',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Brand discovery',
        duration: 'Week 1',
        description: 'We understand your industry, competitors, ideal customer profile, and desired positioning.',
      },
      {
        step: '02',
        title: 'Concept exploration',
        duration: 'Week 2',
        description: 'We present 3 distinct, thoughtfully crafted logo and identity directions with real-world mockups.',
      },
      {
        step: '03',
        title: 'Refinement',
        duration: 'Week 3',
        description: 'We refine your chosen direction, finalize color palettes, typography, and test print legibility.',
      },
      {
        step: '04',
        title: 'Asset packaging',
        duration: 'Week 4',
        description: 'Delivery of all print-ready vector files, digital templates, and your brand guidelines book.',
      },
    ],
    timeAndPrice: {
      timeline: '2 to 3 weeks',
      startingPrice: '[[CONFIRM]]',
      suggestedPrice: 'from ₹20,000 package',
      included: [
        '3 distinct logo concepts with revisions on chosen direction',
        'Stationery design suite (visiting cards, letterhead, envelope)',
        'Social media launch templates',
        'Brand Guidelines PDF and 100% vector file ownership',
      ],
      notIncluded: [
        'Physical paper printing costs (we provide print-ready press PDF files to your printer of choice)',
      ],
    },
    proofBlock: {
      hasCaseStudy: true,
      caseStudySlug: 'plsh-salon',
      title: 'PLSH Salon & Spa Brand Identity',
      badge: 'Client project',
      problem: 'New luxury beauty salon in Chennai needed a complete brand identity package and store opening collateral.',
      solution: 'Designed comprehensive visual identity, price menus, interior signage guidance, and grand opening creative package.',
      result: 'Successful opening week with 100+ appointments and strong local brand recall.',
    },
    faqs: [
      {
        question: 'Do I own the copyright to the logo and designs?',
        answer: 'Yes, 100%. Upon final milestone payment, full intellectual property rights and all original vector source files (AI, EPS, SVG, PDF) are transferred to your company.',
      },
      {
        question: 'What if I do not like the initial design concepts?',
        answer: 'We present 3 fundamentally different conceptual directions grounded in your market research. We include 2 rounds of refinements on your selected direction to ensure you are completely satisfied.',
      },
      {
        question: 'Can you coordinate directly with our commercial printer?',
        answer: 'Yes. We prepare all files according to commercial offset and digital print standards (CMYK, 300 DPI, bleed margins, crop marks) and can speak directly with your printer to verify paper stock specifications.',
      },
      {
        question: 'Do you design packaging and product labels?',
        answer: 'Yes. We design product labels, boxes, pouches, and shipping cartons with accurate barcode and regulatory placement.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): SubService | undefined {
  return servicesData.find((s) => s.slug === slug);
}
