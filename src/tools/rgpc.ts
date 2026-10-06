import type { Framework } from './types';

const checkedOn = '2026-09-14';
const sourceUrl = 'https://diariodarepublica.pt/dr/detalhe/decreto-lei/109-e-2021-175659840';

export const RGPC: Framework = {
  id: 'rgpc',
  sourceUrl,
  checkedOn,
  questions: [
    { key: 'seatInPortugal', type: 'choice', sourceUrl, checkedOn },
    { key: 'employeeCount', type: 'number', sourceUrl, checkedOn, when: [{ key: 'seatInPortugal', is: ['yes', 'partial', 'toConfirm'] }] },
    { key: 'isRegulator', type: 'choice', sourceUrl, checkedOn },
    { key: 'hasComplianceOfficer', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'Decreto-Lei 109-E/2021, artigo 5.º' } },
    // Artigo 20.º(1)(a) + (2)(a) of the RGPC annex, read verbatim on DR: no PPR,
    // or a PPR missing elements of artigo 6.º(1) and (2), is punished with a
    // coima "de (euro) 2000,00 a (euro) 44 891,81, tratando-se de pessoa
    // coletiva". Artigo 20.º(5) halves both limits for negligence.
    { key: 'hasPreventionPlan', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'RGPC, artigos 6.º e 20.º', fine: { min: 2_000, max: 44_891.81, unit: 'EUR', bracket: 'rgpcCore' } } },
    // Artigo 20.º(3)(a) and (4)(a): failing the PPR control reports is the
    // lighter tier, "de (euro) 1000,00 a (euro) 25 000,00".
    { key: 'hasAnnualReport', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'RGPC, artigos 6.º e 20.º', fine: { min: 1_000, max: 25_000, unit: 'EUR', bracket: 'rgpcReporting' } } },
    // Artigo 20.º(1)(b): no code of conduct, or one that ignores the criminal
    // rules on corruption, is the core tier.
    { key: 'hasCodeOfConduct', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'RGPC, artigos 7.º e 20.º', fine: { min: 2_000, max: 44_891.81, unit: 'EUR', bracket: 'rgpcCore' } } },
    { key: 'hasWhistleblowingChannel', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/detalhe/lei/93-2021-169143931', checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'Autoridade competente', article: 'Lei 93/2021, artigo 8.º' } },
    { key: 'hasTraining', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'Decreto-Lei 109-E/2021, artigo 9.º' } },
    // Artigo 20.º(1)(c): no internal control system under artigo 15.º(1).
    { key: 'hasEvaluationSystem', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'RGPC, artigos 15.º e 20.º', fine: { min: 2_000, max: 44_891.81, unit: 'EUR', bracket: 'rgpcCore' } } },
    { key: 'hasThirdPartyDueDiligence', type: 'choice', sourceUrl, checkedOn, when: [{ key: 'employeeCount', min: 50 }], finding: { authority: 'MENAC', article: 'Decreto-Lei 109-E/2021, artigo 18.º' } },
  ],
};
