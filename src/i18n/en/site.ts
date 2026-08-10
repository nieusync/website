const site = {
  documentTitle: 'Nieusync | Five pillars. One partner.',
  nav: {
    whoWeAre: 'Who we are',
    whatWeDo: 'What we do',
    whatWeThink: 'What we think',
    clientArea: 'Client area',
    menu: 'Menu',
  },
  hero: {
    eyebrow: 'The operating partner for European-facing SMEs',
    titleTop: 'Your business,',
    titleSync: 'from above.',
    subtitle:
      'We scale your business with the kind of support usually reserved for large companies.',
    ctaPillars: 'Explore the five pillars',
    ctaContact: 'Talk to us',
  },
  pillars: {
    label: '01 / What we do',
    title: 'Five pillars. One integrated view.',
    items: [
      {
        slug: 'legal',
        name: 'Legal',
        desc: 'Contracts, corporate structure and risk.',
        intro:
          'From the first contract to the toughest negotiation: legal structure for a business operating across European markets.',
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
        desc: 'Technology, data and automation.',
        intro:
          'Systems, automation and a digital presence built around how the business actually runs day to day.',
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
        desc: 'Positioning, priorities and a plan you can execute.',
        intro:
          'Clarity on where to play and how to win in Europe, and a plan the whole company can execute without translation.',
        services: [
          'Positioning and business model',
          'Growth and expansion planning',
          'Pricing and offer design',
          'European market entry and partnerships',
          'Objectives and execution cadence',
        ],
      },
      {
        slug: 'operations',
        name: 'Operations',
        desc: 'Processes measured, refined, repeatable.',
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
        slug: 'financial',
        name: 'Financial',
        desc: 'Tax, funding and margin.',
        intro:
          'Financial and tax architecture: margin, funding and the compliance that sits underneath both.',
        services: [
          'Tax planning and optimisation',
          'Filings and ongoing compliance',
          'Incentives, grants and funding',
          'Accounting coordination and cash planning',
          'Audit readiness',
        ],
      },
    ],
  },
  approach: {
    label: '03 / The method',
    title: 'How we sync.',
    steps: [
      { title: 'Map', desc: 'We read the problem you brought us and the parts of the business it touches.' },
      { title: 'Sync', desc: 'One plan with priorities, owners and deadlines, whatever its scope.' },
      { title: 'Scale', desc: 'Continuous execution with your team, measured at every step.' },
    ],
  },
  portal: {
    label: '02 / Client area',
    title: 'Your company, live.',
    cta: 'Book a demo',
    // Labels rendered inside the mock client-area screenshot
    shot: {
      workspace: 'Workspace',
      company: 'Acme Comércio, Lda.',
      nav: ['Overview', 'Documents', 'Requests', 'Invoices', 'Team'],
      greeting: 'Good morning, Marta',
      subgreeting: '4 open items on your active engagements',
      stats: [
        { label: 'Open requests', value: '4' },
        { label: 'Documents', value: '128' },
      ],
      progressTitle: 'Your engagements',
      progress: [
        { name: 'Legal · Supplier contracts', value: 82 },
        { name: 'Digital · Website rebuild', value: 64 },
      ],
      activityTitle: 'Recent activity',
      activity: [
        { title: 'Supplier agreement reviewed', meta: 'Legal · 2h ago' },
        { title: 'Staging site handed over', meta: 'Digital · yesterday' },
        { title: 'Trademark filing submitted', meta: 'Legal · 3 days ago' },
      ],
    },
  },
  contact: {
    documentTitle: 'Talk to us | Nieusync',
    label: 'Talk to us',
    title: 'Tell us where it hurts.',
    subtitle:
      'Tell us about your company and what you need. Your message goes to the partners, not to a queue.',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    message: 'How can we help?',
    messagePlaceholder: 'Tell us briefly about your company and what you need.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you, your message is with us.',
    error: 'Something went wrong. Please email geral@nieusync.com directly.',
    mailSubject: 'Website contact',
  },
  newsletter: {
    label: 'Free guide',
    title: '10 legal protections every SME needs',
    emailPlaceholder: 'your@email.com',
    submit: 'Send me the guide',
    sending: 'Sending…',
    success: 'Subscription received.',
    error: 'Something went wrong. Please email geral@nieusync.com directly.',
    consent: 'We only send the guide and occasional articles. Unsubscribe any time.',
    mailSubject: 'Newsletter: 10 legal protections every SME needs',
  },
  pillarPage: {
    back: 'All pillars',
    servicesLabel: 'What this covers',
    ctaTitle: 'Ready to put this pillar in sync?',
    cta: 'Talk to us',
  },
  whoPage: {
    documentTitle: 'Who we are | Nieusync',
    label: 'Who we are',
    title: 'One partner, five disciplines.',
    subtitle:
      'We help SMEs targeting the European market grow and scale, with people who have actually built and run small companies.',
    golden: [
      {
        key: 'Why',
        title: 'Why we exist',
        text: 'Because good European companies stall for reasons that have nothing to do with their product: a contract nobody read, a market entry nobody planned, a process nobody wrote down. We believe an SME deserves the same calibre of legal, technical and strategic thinking that a funded company buys piece by piece.',
      },
      {
        key: 'How',
        title: 'How we do it',
        text: 'One team working inside your business rather than sending reports to it. We agree one plan with owners and dates and stay through execution. Most engagements start in a single pillar, and when the work crosses into another the same team carries it, instead of you hiring a second supplier who has to be briefed from scratch.',
      },
      {
        key: 'What',
        title: 'What we do',
        text: 'Legal, Digital, Strategy, Operations and Financial. One of them or all five, delivered by one team: the contracts and corporate structure, the systems and the data, the go-to-market plan, the processes and the numbers.',
      },
    ],
    teamLabel: 'Executive team',
    teamTitle: 'Operators, not observers.',
    teamSubtitle:
      'Our expertise comes from working with small companies, from the inside, with the same constraints you have.',
    team: [
      {
        name: 'Ricardo Serrão de Carvalho',
        role: 'Managing Partner & CEO',
        pillars: 'Legal · Financial · Strategy',
        bio: 'More than 15 years working with SMEs on Legal and Strategy: corporate structure, contracts, negotiations, tax architecture and growth plans for companies operating across European markets. He is the partner who stays closest to the work.',
      },
      {
        name: 'João Carvalho',
        role: 'Partner & COO',
        pillars: 'Digital · Strategy · Operations',
        bio: 'Previously CTO of two VC-backed US companies. Builds the technology, the data and the operating processes that let a small team run like a much larger one, and keeps the plan moving once it is agreed.',
      },
      {
        name: 'Ricardo Carvalho',
        role: 'Partner & CMO',
        pillars: 'Digital',
        bio: 'Comes from digital marketing and video production. Runs the brand, the content and the campaigns: the part of Digital your clients actually see, made in-house rather than bought by the hour.',
      },
    ],
    ctaTitle: 'Want the same team behind your company?',
    cta: 'Talk to us',
  },
  whatPage: {
    documentTitle: 'What we do | Nieusync',
    label: 'What we do',
    title: 'Five pillars. One engagement.',
    subtitle:
      'Take the pillar you need. Nothing here obliges you to buy the other four.',
    ctaTitle: 'Not sure which pillar you need?',
    cta: 'Talk to us',
  },
  clientAreaPage: {
    documentTitle: 'Client area | Nieusync',
    label: 'Client area',
    title: 'Welcome back.',
    subtitle: 'Sign in to your documents, your requests and the progress of your work with us.',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'your@email.com',
    submit: 'Sign in',
    forgot: 'Forgot your password?',
    noAccount: 'No access yet?',
    noAccountCta: 'Talk to us',
    // Shown instead of authenticating. The real client area is a separate app
    preview: 'The client area is not live yet. Speak to your Nieusync contact about access.',
    back: 'Back to site',
  },
  footer: {
    company: 'Company',
    pillars: 'What we do',
    contact: 'Contact',
    legal: 'Legal',
    blog: 'What we think',
    clientArea: 'Client area',
    copyright: (year: number) =>
      `© ${year} Nieusync, Sociedade Multidisciplinar de Advogados e Consultores SP, LDA. Bar registration 17/26 — All rights reserved.`,
  },
};

export type Site = typeof site;
export default site;
