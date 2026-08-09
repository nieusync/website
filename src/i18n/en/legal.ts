// Six legal documents, one entry per document. `slug` is the URL segment and is
// intentionally identical in both languages so a link keeps working across a
// language switch. Bodies are generic templates with [SQUARE BRACKET] slots for
// the registration details. They need a lawyer's sign-off before launch.
const legal = {
  back: 'All legal documents',
  indexTitle: 'Legal',
  contents: 'Contents',
  indexDocumentTitle: 'Legal | NieuSync',
  indexHeading: 'Legal documents.',
  indexSubtitle:
    'The terms this site is provided under, what we do with your data, and the standards we hold ourselves to.',
  indexBack: 'Back to site',
  indexDisclaimer:
    'These documents are templates pending final legal review. For any question, write to geral@nieusync.com.',
  read: 'Read',
  updatedLabel: 'Last updated',
  updated: 'August 2026',
  disclaimer:
    'This document is a template pending final legal review. For any question, write to geral@nieusync.com.',
  docs: [
    {
      slug: 'legal-notice',
      title: 'Legal notice',
      summary: 'Who operates this website and under what terms it is made available.',
      sections: [
        {
          title: 'Owner of the website',
          paragraphs: [
            'This website is owned and operated by [ENTITY NAME], with registered office at [ADDRESS], taxpayer number [VAT NUMBER], registered at the [COMMERCIAL REGISTRY] under the same number (“NieuSync”, “we”).',
            'You can contact us at geral@nieusync.com or (+351) 269 030 096. Calls to Portuguese landline numbers are charged at the national landline rate.',
          ],
        },
        {
          title: 'Purpose of the site',
          paragraphs: [
            'This site presents NieuSync and the services we provide across our five pillars: Legal, Digital, Strategy, Operations and Financial. Its content is informational and does not constitute legal, tax, financial or any other professional advice, nor a binding offer.',
            'Any professional relationship with NieuSync starts only with a written engagement signed by both parties.',
          ],
        },
        {
          title: 'Intellectual property',
          paragraphs: [
            'The NieuSync name and logo, the site design, its texts, images and source code belong to NieuSync or to its licensors and are protected by intellectual property law.',
            'You may consult and share the content for personal, non-commercial use, citing the source. Any reproduction, adaptation or commercial use requires our prior written permission.',
          ],
        },
        {
          title: 'Liability',
          paragraphs: [
            'We keep the content accurate and up to date, but we do not guarantee that it is complete, current or free of error, and we may change it at any time without notice.',
            'We are not liable for decisions taken solely on the basis of the content published here, nor for the content of third-party sites we link to.',
          ],
        },
        {
          title: 'Applicable law',
          paragraphs: [
            'This notice is governed by Portuguese law. Disputes arising from the use of this site are submitted to the courts of [JUDICIAL DISTRICT], without prejudice to any mandatory rule that gives the consumer a different forum.',
          ],
        },
      ],
    },
    {
      slug: 'code-of-conduct',
      title: 'Code of conduct',
      summary: 'The standards we hold ourselves to, and what you can demand of us.',
      sections: [
        {
          title: 'Scope',
          paragraphs: [
            'This code applies to every partner, employee, contractor and supplier acting on behalf of NieuSync, in any engagement and in any market.',
          ],
        },
        {
          title: 'Integrity and independence',
          paragraphs: [
            'We act honestly and give our real opinion, including when it costs us work. We do not accept or offer gifts, payments or advantages intended to influence a decision, and we do not tolerate any form of corruption or facilitation payment.',
            'We disclose any conflict of interest as soon as we identify it and, where the conflict cannot be managed, we step away from the engagement.',
          ],
        },
        {
          title: 'Confidentiality',
          paragraphs: [
            'Everything we learn about a client is confidential and stays that way after the engagement ends. Client information is only accessed by the people who need it to do the work, and is never used for our own benefit or that of another client.',
          ],
        },
        {
          title: 'Respect and non-discrimination',
          paragraphs: [
            'We do not tolerate harassment, intimidation or discrimination on grounds of gender, origin, age, disability, religion, sexual orientation or any other personal characteristic, internally or in any client environment.',
          ],
        },
        {
          title: 'Legal compliance',
          paragraphs: [
            'We comply with the law of every jurisdiction where we operate, including competition, data protection, anti-money-laundering and sanctions rules. Where the law and this code differ, the stricter standard applies.',
          ],
        },
        {
          title: 'Reporting a concern',
          paragraphs: [
            'Any breach of this code can be reported to geral@nieusync.com. Reports are treated confidentially and no one suffers retaliation for reporting a concern in good faith.',
          ],
        },
      ],
    },
    {
      slug: 'terms-and-conditions',
      title: 'Terms and conditions',
      summary: 'The rules for using this website and for requesting information from us.',
      sections: [
        {
          title: 'Acceptance',
          paragraphs: [
            'By using this website you accept these terms. If you do not agree with them, please do not use the site.',
            'We may change these terms at any time; the version published here is the one in force.',
          ],
        },
        {
          title: 'Use of the site',
          paragraphs: [
            'The site is provided “as is” and free of charge. You undertake not to use it for unlawful purposes, not to attempt to access areas or data you are not authorised to access, and not to interfere with its normal operation.',
            'Our acceptable use policy sets out in more detail what is not allowed.',
          ],
        },
        {
          title: 'Forms and communications',
          paragraphs: [
            'When you send us a message or subscribe to our newsletter, you warrant that the data you provide is true and that you may use the email address you supply. We use that data as described in our privacy policy.',
            'Sending a message does not create any professional relationship, nor does it oblige us to accept an engagement.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'The services described on the site are provided under a separate written engagement that sets out scope, deliverables, deadlines, fees and liability. In case of conflict, that engagement prevails over these terms.',
          ],
        },
        {
          title: 'Liability',
          paragraphs: [
            'We do not guarantee uninterrupted or error-free availability of the site, and to the extent permitted by law we are not liable for indirect damage or loss of profit arising from its use.',
            'Nothing in these terms excludes liability that cannot be excluded under Portuguese law.',
          ],
        },
        {
          title: 'Law and jurisdiction',
          paragraphs: [
            'These terms are governed by Portuguese law and disputes are submitted to the courts of [JUDICIAL DISTRICT]. Consumers may also use the alternative dispute resolution entities listed at www.consumidor.gov.pt.',
          ],
        },
      ],
    },
    {
      slug: 'cookie-policy',
      title: 'Cookie policy',
      summary: 'What we store in your browser, and how to refuse it.',
      sections: [
        {
          title: 'What cookies are',
          paragraphs: [
            'Cookies are small files a site stores in your browser. This policy also covers equivalent technologies such as local storage.',
          ],
        },
        {
          title: 'What we use',
          paragraphs: [
            'This site uses strictly necessary storage only: we keep your chosen language in your browser’s local storage so the site opens in the same language next time. It contains no personal data and is not shared with anyone.',
            'We do not use advertising or profiling cookies. If we ever add analytics or third-party cookies, we will ask for your consent before setting them and update this policy.',
          ],
        },
        {
          title: 'Third-party content',
          paragraphs: [
            'Some pages load content from third parties, for example our blog articles and the fonts served by Google Fonts. Those providers may receive your IP address to deliver the content. Their own policies apply to that processing.',
          ],
        },
        {
          title: 'How to control it',
          paragraphs: [
            'You can delete or block storage at any time in your browser settings. Blocking the language preference does not stop the site from working. It simply forgets your choice.',
          ],
        },
      ],
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy policy',
      summary: 'What personal data we collect, why, and what rights you have.',
      sections: [
        {
          title: 'Controller',
          paragraphs: [
            '[ENTITY NAME], with registered office at [ADDRESS], taxpayer number [VAT NUMBER], is the controller of the personal data processed through this website. Data protection contact: geral@nieusync.com.',
          ],
        },
        {
          title: 'What we collect and why',
          paragraphs: [
            'Contact form: name, company, email and the content of your message, to answer you and assess a possible engagement. Legal basis: steps taken at your request prior to entering into a contract.',
            'Newsletter and guide: your email address, to send you the requested document and occasional articles. Legal basis: your consent, which you may withdraw at any time.',
            'Technical logs: our hosting provider records IP address and browser data for security and availability. Legal basis: our legitimate interest in operating the site safely.',
          ],
        },
        {
          title: 'How long we keep it',
          paragraphs: [
            'Contact messages are kept for up to two years after the last exchange, unless they result in an engagement, in which case the engagement’s own retention rules apply. Newsletter data is kept until you unsubscribe.',
          ],
        },
        {
          title: 'Who has access',
          paragraphs: [
            'Only NieuSync team members who need the data for the purpose above, plus the service providers who host our site and deliver our email. Those providers act on our instructions under a data processing agreement. We do not sell your data.',
            'Where a provider processes data outside the European Economic Area, we rely on the European Commission’s standard contractual clauses.',
          ],
        },
        {
          title: 'Your rights',
          paragraphs: [
            'You may request access, rectification, erasure, restriction or portability of your data, object to processing based on legitimate interest, and withdraw consent at any time. Write to geral@nieusync.com and we will reply within 30 days.',
            'You may also complain to the Portuguese supervisory authority, the Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
          ],
        },
        {
          title: 'Security',
          paragraphs: [
            'We use encryption in transit, access control on a need-to-know basis and regular reviews of our providers. No system is completely secure, but we notify you and the supervisory authority whenever the law requires it.',
          ],
        },
      ],
    },
    {
      slug: 'acceptable-use-policy',
      title: 'Acceptable use policy',
      summary: 'What may not be done with this site and with any system we provide.',
      sections: [
        {
          title: 'Scope',
          paragraphs: [
            'This policy applies to this website, to the client area and to any system NieuSync makes available to a client or to the public.',
          ],
        },
        {
          title: 'Prohibited use',
          paragraphs: [
            'You may not use our systems to: break the law or third-party rights; send spam or unsolicited commercial communications; publish unlawful, defamatory, discriminatory or infringing content; or upload malware.',
            'You may not attempt to gain unauthorised access, test security without written authorisation, circumvent access limits, scrape content at scale, or overload the infrastructure.',
          ],
        },
        {
          title: 'Accounts and credentials',
          paragraphs: [
            'Client area credentials are personal and non-transferable. You are responsible for everything done through your account and must tell us immediately at geral@nieusync.com if you suspect it has been compromised.',
          ],
        },
        {
          title: 'Consequences',
          paragraphs: [
            'We may suspend or terminate access without notice where we identify a breach of this policy, and report the matter to the competent authorities where the law requires it.',
          ],
        },
        {
          title: 'Reporting abuse',
          paragraphs: [
            'Report abuse or a vulnerability to geral@nieusync.com. We do not pursue researchers who report a vulnerability in good faith, without accessing third-party data and without making it public before we have fixed it.',
          ],
        },
      ],
    },
  ],
};

export type Legal = typeof legal;
export default legal;
