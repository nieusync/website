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
    titleTop: 'Business is hard.',
    titleSync: 'We like it.',
    subtitle:
      'We help scale your business with the kind of support usually reserved for large companies.',
    ctaPillars: 'Explore the five pillars',
    ctaContact: 'Talk to us',
  },
  pillars: {
    label: '01 / What we do',
    title: 'Five pillars. One integrated view.',
    statusLive: 'Current',
    statusSoon: 'Future',
    more: (n: number) => (n === 1 ? '+ 1 more service' : `+ ${n} more services`),
    items: [
      {
        slug: 'legal',
        name: 'Legal',
        desc: 'Risk analysis, compliance and legal support.',
        intro:
          'Compliance and legal services, for a company operating across European markets. From internal control design to representation in court, one team follows the matter from start to finish.',
        services: [
          'Regulatory reviews and legal compliance audits',
          'Internal control design',
          'General SME compliance, GDPR and anti-corruption rules',
          'Legal representation, litigation and dispute resolution',
          'Contract drafting and negotiation',
          'Corporate and commercial law advice',
          'Intellectual property',
          'Company incorporation and governance',
          'Insolvency and business recovery',
          'Employment and tax law',
        ],
      },
      {
        slug: 'digital',
        name: 'Digital',
        desc: 'Information technology, marketing and sales.',
        intro:
          'Digital-native services, end to end. We choose and implement the systems the operation runs on, assess vendors before you sign with them, and handle the brand, the customer acquisition and the pricing that pay for all of it.',
        services: [
          'IT infrastructure consulting',
          'System selection and implementation',
          'Digital transformation roadmaps',
          'Software vendor assessment',
          'Brand positioning',
          'Customer acquisition: channel strategy and funnel design',
          'Pricing optimisation',
        ],
      },
      {
        slug: 'strategy',
        name: 'Strategy',
        desc: 'Positioning, M&A and market entry.',
        intro:
          'Where to compete and how to win, decided before the first euro is spent. Competitive positioning, M&A deals and entry into new markets, always with the plan, the numbers and the timeline behind every decision.',
        services: [
          'Competitive positioning',
          'M&A advisory',
          'Market entry strategy',
        ],
      },
      {
        slug: 'operations',
        name: 'Operations',
        desc: 'Supply chain, cost and process.',
        intro:
          'The machine behind the promise: simple processes and costs under control. We design the supply chain, cut what adds no value, and leave written processes your team can repeat without depending on us.',
        services: [
          'Supply chain optimisation',
          'Cost reduction',
          'Process simplification',
        ],
      },
      {
        slug: 'financial',
        name: 'Financial',
        desc: 'Financial management, from budget to management control.',
        intro:
          'Financial management, from budget to management control. Budgeting and forecasting you can trust, reporting management can actually decide on, and a company ready to raise capital and restructure its balance sheet when it is time to grow.',
        services: [
          'Budgeting and forecasting',
          'Financial reporting and management control',
          'Advisory on financial structuring for capital raising',
          'Financial planning and analysis (FP&A)',
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
    disclaimer: 'Illustration. Fictional data.',
    // Labels rendered inside the mock client-area screenshot. It mirrors the
    // portal's own Overview, so when that page changes, this changes with it.
    shot: {
      company: 'Acme Comércio, Lda.',
      nav: ['Overview', 'Documents', 'Requests', 'Team'],
      greeting: 'Good morning, Marta',
      stats: [
        { label: 'Open requests', value: '4' },
        { label: 'Documents', value: '128' },
      ],
      requestsTitle: 'Your recent requests',
      requests: [
        { title: 'Supplier agreement review', meta: 'P-0412 · 12 Aug' },
        { title: 'Trademark filing', meta: 'P-0408 · 5 Aug' },
        { title: 'Staging site sign-off', meta: 'P-0401 · 28 Jul' },
      ],
      documentsTitle: 'Recent documents',
      documents: [
        { title: 'Agreement v3.pdf', meta: 'Shared by Nieusync · 12 Aug' },
        { title: 'Trademark filing.pdf', meta: 'Shared by Nieusync · 5 Aug' },
        { title: 'Company certificate.pdf', meta: 'Sent by you · 22 Jul' },
      ],
    },
  },
  contact: {
    documentTitle: 'Talk to us | Nieusync',
    label: 'Contact',
    title: 'Talk to us.',
    subtitle:
      'Tell us about your company and what you need.',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    message: 'How can we help?',
    messagePlaceholder: 'Tell us briefly about your company and what you need.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you, your message is with us.',
    error: 'Something went wrong. Please email geral@nieusync.com directly.',
  },
  newsletter: {
    label: 'Free guide',
    title: '10 legal protections every SME needs',
    emailPlaceholder: 'your@email.com',
    submit: 'Send me the guide',
    sending: 'Sending…',
    success: 'One step left: confirm your subscription in the email we just sent.',
    error: 'Something went wrong. Please email geral@nieusync.com directly.',
    consent: 'We only send the guide and occasional articles. Unsubscribe any time.',
  },
  pillarPage: {
    back: 'All pillars',
    servicesLabel: 'What this covers',
  },
  whoPage: {
    documentTitle: 'Who we are | Nieusync',
    label: 'Who we are',
    title: 'One partner, five pillars.',
    subtitle:
      'We were born from the absolute conviction that startups and SMEs deserve the same specialist expertise usually reserved for large companies. We are a multidisciplinary law firm that helps SMEs grow and scale, with a team that has helped create several companies at home and abroad.',
    golden: [
      {
        key: 'Why',
        title: 'Why we exist',
        text: 'Because good companies stall for reasons that have nothing to do with their product: a contract nobody read, a market entry nobody planned, a process nobody wrote down. We believe an SME deserves the same calibre of legal, technical and strategic thinking that a multinational has at its disposal.',
      },
      {
        key: 'How',
        title: 'How we do it',
        text: 'One team working inside your business rather than sending reports to it. We agree one plan, with an owner for each area and fixed dates, and stay through execution. A project can start in a single pillar, and when the work crosses into another the coordination is already in place, sparing you the trouble of finding a second supplier who has to be briefed from scratch.',
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
      'Our expertise comes from working with small companies, from the inside, knowing the difficulties they face.',
    team: [
      {
        name: 'Ricardo Serrão de Carvalho',
        role: 'Managing Partner & Lawyer',
        pillars: 'Legal · Financial · Strategy',
        bio: 'More than 15 years working with SMEs on Legal and Strategy: corporate structure, contracts, negotiations, tax architecture and growth plans for companies operating across European markets. He is the partner who stays closest to the work.',
      },
      {
        name: 'João Carvalho',
        role: 'Partner',
        pillars: 'Digital · Strategy · Operations',
        bio: 'Previously CTO of two VC-backed US companies. Builds the technology, the data and the operating processes that let a small team run like a much larger one. Keeps the plan moving once it is agreed.',
      },
      {
        name: 'Ricardo Carvalho',
        role: 'Partner',
        pillars: 'Digital',
        bio: 'Comes from digital marketing and video production. Runs the brand, the content and the campaigns: the part of Digital your clients actually see, made in-house rather than bought by the hour.',
      },
    ],
    ctaTitle: 'Want this team alongside your company?',
    cta: 'Talk to us',
  },
  whatPage: {
    documentTitle: 'What we do | Nieusync',
    label: 'What we do',
    title: 'Five pillars. One goal.',
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
