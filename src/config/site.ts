export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface ServiceGroup {
  group: string;
  items: NavItem[];
}

export const siteConfig = {
  name: 'GM Design',
  legalName: 'GM Design',
  tagline: 'AI assistants, workflow automations, and trustworthy digital systems for Indian businesses',
  description:
    'We set up WhatsApp AI agents, workflow automations, and custom AI tools that save Indian businesses hours every day. Fixed-price, plain language, human handover.',
  url: 'https://gmdesign.in',
  bookingUrl: 'https://cal.com/gm-designs-karur/30min',
  defaultBookingHref: 'https://cal.com/gm-designs-karur/30min',
  whatsappNumber: '+91 99445 26954',
  whatsappHref: 'https://wa.me/919944526954?text=Hi%20GM%20Design%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services',
  phone: '+91 99445 26954',
  email: 'contact@gmdesign.in',
  city: 'Karur',
  yearStarted: '2018',
  address: 'Vengamedu, Karur, Tamil Nadu',
  gstinUdyam: '',
  socials: {
    instagram: '',
  },
  trustSignals: {
    responseTime: 'within 1 working day',
    pricingModel: 'Fixed-price proposals in writing',
    websitesDelivered: '85',
  },
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Contact', href: '/contact/' },
];

export const serviceDropdown: ServiceGroup[] = [
  {
    group: 'AI Services',
    items: [
      {
        label: 'WhatsApp AI Agent',
        href: '/services/whatsapp-ai-agent/',
        description: 'Answers queries, qualifies leads, takes orders in English & Tamil.',
        badge: 'Flagship',
      },
      {
        label: 'Website AI Assistant',
        href: '/services/website-ai-assistant/',
        description: '24/7 assistant trained on your own prices, services, and FAQs.',
      },
      {
        label: 'Workflow Automation',
        href: '/services/workflow-automation/',
        description: 'Connect WhatsApp, Google Sheets, Tally, CRM, and email automatically.',
      },
      {
        label: 'Document & Order Processing',
        href: '/services/document-order-processing/',
        description: 'Extract data from invoices, POs, and PDFs into your sheets or ERP.',
      },
      {
        label: 'Custom AI Tools & Integrations',
        href: '/services/custom-ai-apps/',
        description: 'Knowledge assistants over internal docs, report generators, APIs.',
      },
      {
        label: 'AI Audit & Team Training',
        href: '/services/ai-audit-training/',
        description: '1-week fixed review: where AI saves time & money, ranked with cost.',
        badge: 'Entry Offer',
      },
    ],
  },
  {
    group: 'Websites & Marketing',
    items: [
      {
        label: 'Website Design & Development',
        href: '/services/website-design/',
        description: 'Fast, clear, trustworthy websites built for conversions.',
      },
      {
        label: 'Catalog & E-commerce Websites',
        href: '/services/catalog-ecommerce-websites/',
        description: 'Product showcase, PDF catalogs, direct WhatsApp enquiry flows.',
      },
      {
        label: 'SEO & Google Business Profile',
        href: '/services/seo-google-business-profile/',
        description: 'Local search rankings, Google Maps setup, on-page optimization.',
      },
      {
        label: 'Social Media & Ads',
        href: '/services/social-media-ads/',
        description: 'Targeted Meta & Google ads, monthly reports, transparent ROAS.',
      },
      {
        label: 'Branding & Graphic Design',
        href: '/services/branding-design/',
        description: 'Logos, brand identity guidelines, print & digital collateral.',
      },
    ],
  },
];
