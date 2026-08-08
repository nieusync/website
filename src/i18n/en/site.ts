const site = {
  documentTitle: 'NIEUSYNC — Five pillars. One partner.',
  nav: {
    whoWeAre: 'Who we are',
    whatWeDo: 'What we do',
    whatWeThink: 'What we think',
    clientArea: 'Client area',
  },
  region: {
    select: 'Select your location',
  },
  hero: {
    eyebrow: 'The B2B operating partner',
    titleTop: 'Your business,',
    titleSync: 'in sync.',
    subtitle:
      'Legal, digital, strategy, operations and fiscal — five disciplines, one integrated partner, zero blind spots.',
    ctaPillars: 'Explore the five pillars',
  },
  who: {
    label: '01 — Who we are',
    title: 'One partner, five disciplines.',
    text: 'NIEUSYNC exists because companies do not have five separate problems — they have one business. We bring legal, digital, strategy, operations and fiscal expertise into a single team that sees the whole picture and answers for the outcome.',
  },
  pillars: {
    label: '02 — What we do',
    title: 'Five pillars. Zero silos.',
    subtitle: 'Every decision in a company touches all five. So we treat them as one system.',
    items: [
      {
        slug: 'legal',
        name: 'Legal',
        desc: 'Contracts, corporate structure and risk — engineered before problems exist.',
        intro:
          'From the first contract to the toughest negotiation — legal structure that protects the business and never slows it down.',
        services: [
          'Contract drafting and review',
          'Corporate structure and governance',
          'Employment and labour law',
          'Negotiation and dispute support',
          'Privacy and GDPR compliance',
        ],
      },
      {
        slug: 'digital',
        name: 'Digital',
        desc: 'Technology, data and automation that turn your operation into an advantage.',
        intro:
          'Technology that pays for itself: systems, automation and a digital presence that turn daily operations into a competitive edge.',
        services: [
          'Web and product development',
          'Systems integration and automation',
          'Data, dashboards and analytics',
          'Digital presence and performance marketing',
          'Security and access fundamentals',
        ],
      },
      {
        slug: 'strategy',
        name: 'Strategy',
        desc: 'Positioning, priorities and a plan the whole company can actually execute.',
        intro:
          'Clarity on where to play and how to win — and a plan the whole company can execute without translation.',
        services: [
          'Positioning and business model',
          'Growth and expansion planning',
          'Pricing and offer design',
          'Market entry and partnerships',
          'Objectives and execution cadence',
        ],
      },
      {
        slug: 'operations',
        name: 'Operations',
        desc: 'Processes that scale without chaos — measured, refined, repeatable.',
        intro:
          'The machine behind the promise: processes that scale without chaos and numbers you can steer by.',
        services: [
          'Process design and documentation',
          'KPIs and management reporting',
          'Vendor and supply management',
          'Quality and continuous improvement',
          'Tooling and workflow selection',
        ],
      },
      {
        slug: 'fiscal',
        name: 'Fiscal',
        desc: 'Tax architecture and compliance that protect your margin and your sleep.',
        intro:
          'A tax and compliance architecture that protects margin, avoids surprises and survives any inspection.',
        services: [
          'Tax planning and optimisation',
          'Filings and ongoing compliance',
          'Incentives, grants and funding',
          'Accounting coordination',
          'Audit readiness',
        ],
      },
    ],
  },
  approach: {
    label: '03 — The method',
    title: 'How we sync.',
    steps: [
      { title: 'Map', desc: 'A 360° reading of your company across the five pillars.' },
      { title: 'Sync', desc: 'One integrated plan — priorities, owners, deadlines.' },
      { title: 'Scale', desc: 'Continuous execution with your team, measured at every step.' },
    ],
  },
  blog: {
    label: '04 — What we think',
    title: 'Latest thinking.',
    subtitle: 'Practical articles across the five pillars, written with companies in mind.',
    cta: 'View all articles',
    readArticle: 'Read article',
    minutesSuffix: 'min read',
    dateLocale: 'en-GB',
  },
  portal: {
    label: '05 — Client area',
    title: 'Your company, live.',
    desc: 'Documents, requests and progress across all five pillars — in one secure place, always up to date.',
    cta: 'Enter client area',
    hint: 'Access reserved for NIEUSYNC clients.',
  },
  pillarPage: {
    back: 'All pillars',
    servicesLabel: 'What this covers',
    ctaTitle: 'Ready to put this pillar in sync?',
    cta: 'Enter client area',
  },
  footer: {
    tagline: 'Five pillars. One partner.',
    company: 'Company',
    pillars: 'What we do',
    contact: 'Contact',
    blog: 'Blog',
    clientArea: 'Client area',
    copyright: (year: number) => `© ${year} NIEUSYNC. All rights reserved.`,
  },
};

export type Site = typeof site;
export default site;
