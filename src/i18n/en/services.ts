export interface ServicePage {
  documentTitle: string
  label: string
  title: string
  subtitle: string
  caption: string
  cta: string
  headers: [string, string, string, string]
  rows: Array<{ label: string; values: [string, string, string] }>
}

export interface Services {
  nav: { overview: string; services: string; legal: string; compliance: string; tools: string }
  legal: ServicePage
  compliance: ServicePage
}

const services: Services = {
  nav: {
    overview: 'Overview',
    services: 'Services',
    legal: 'Legal',
    compliance: 'Compliance',
    tools: 'Tools',
  },
  legal: {
    documentTitle: 'Legal services | Nieusync',
    label: 'Legal',
    title: 'Legal services.',
    subtitle: 'Ongoing legal support for SMEs, with the level of cover that fits the work.',
    caption: 'Legal service plans',
    cta: 'Talk to us',
    headers: ['Service', 'Essential', 'Professional', 'Advanced'],
    rows: [
      { label: 'Access to the client platform', values: ['✓', '✓', '✓'] },
      { label: 'Included hours per month', values: ['3h', '7h', '12h'] },
      { label: 'Client profile', values: ['Microbusiness with occasional needs', 'SME with employees and regular contracting', 'SME with regulated activity or high volume of matters'] },
      { label: 'Legal consultation, telephone, email or video call', values: ['✓', '✓', '✓ (Senior lawyer)'] },
      { label: 'Review of contracts and documents', values: ['Up to 2 per month', '✓', '✓'] },
      { label: 'Document drafting', values: ['Letters, declarations and simple formal notices', 'Essential, plus commercial, employment and service contracts', 'Professional, plus contracts and negotiation with counterparties'] },
      { label: 'Employment support', values: ['Routine guidance', 'Internal regulations and disciplinary advice', 'Disciplinary procedure without dismissal intention'] },
      { label: 'Routine corporate acts', values: ['—', 'Minutes, approval of accounts and simple amendments', 'Professional, plus filing registrations'] },
      { label: 'Out of court debt collection', values: ['—', 'Formal notices', 'Formal notices and payment agreements'] },
      { label: 'Compliance, GDPR, RGPC and AI Act', values: ['—', 'Legislative alerts', 'Alerts and answers to questions'] },
      { label: 'Administrative offences, administrative phase', values: ['—', '—', '✓'] },
      { label: 'Progress meeting', values: ['Every six months', 'Quarterly', 'Monthly'] },
      { label: 'Response time', values: ['3 business days', '2 business days', '1 business day'] },
      { label: 'Hours and matters report', values: ['Annual', 'Every six months', 'Quarterly'] },
    ],
  },
  compliance: {
    documentTitle: 'Compliance services | Nieusync',
    label: 'Compliance',
    title: 'Compliance services.',
    subtitle: 'GDPR and RGPC support sized to your organisation and regulatory exposure.',
    caption: 'Compliance service plans',
    cta: 'Talk to us',
    headers: ['Service', 'Essential', 'Professional', 'Advanced'],
    rows: [
      { label: 'Access to the client platform', values: ['✓', '✓', '✓'] },
      { label: 'Included consultation hours per month', values: ['2h', '5h', '9h'] },
      { label: 'Covered regimes', values: ['GDPR', 'GDPR and RGPC', 'GDPR and RGPC, with outsourced compliance function'] },
      { label: 'Organisation size', values: ['Up to 49 employees', '50 to 249 employees', '50 to 249 employees with sensitive data, regulated sector or several sites'] },
      { label: 'External data protection officer', values: ['—', 'Appointed and communicated to CNPD', 'Appointed and communicated to CNPD'] },
      { label: 'Record of processing activities', values: ['Annual review', 'Six-month review', 'Continuous update'] },
      { label: 'Data subject requests', values: ['Advice on the response', 'Drafting responses', 'Complete management, with record'] },
      { label: 'Personal data breaches', values: ['Assessment and notification to CNPD', 'Same, with notification to data subjects', 'Same, with annual exercise'] },
      { label: 'Subcontracting contracts and new processing', values: ['Up to 3 reviews per year', 'Unlimited, within included hours', 'Prior DPO opinion on all new projects'] },
      { label: 'Impact assessments', values: ['—', '1 per year', '2 per year'] },
      { label: 'Support for regulatory compliance officer', values: ['—', 'Obligation calendar and quarterly meeting', 'Monthly meeting and decision preparation'] },
      { label: 'Risk prevention plan', values: ['—', 'Monitoring measures', 'Monitoring and annual risk reassessment'] },
      { label: 'Risk prevention plan assessment reports, October and April', values: ['—', 'Preparation for officer approval', 'Preparation, with support for publication'] },
      { label: 'Code of conduct', values: ['—', 'Review and publication', 'Review, publication and support in case of infringement'] },
      { label: 'Reporting channel', values: ['—', 'Annual verification and follow-up support', 'External receipt of reports and follow-up support'] },
      { label: 'Training', values: ['—', '1 annual GDPR session', '2 annual sessions, GDPR and RGPC'] },
      { label: 'Follow-up audit', values: ['—', 'Annual, sampled', 'Annual, complete'] },
      { label: 'Management report', values: ['Annual', 'Every six months', 'Quarterly'] },
      { label: 'CNPD, MENAC and legislative alerts', values: ['✓', '✓', '✓'] },
      { label: 'Response time', values: ['3 business days', '2 business days', '1 business day'] },
    ],
  },
} as const

export default services
