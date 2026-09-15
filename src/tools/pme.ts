import type { Framework } from './types';

const checkedOn = '2026-09-14';

export const PME: Framework = {
  id: 'pme',
  sourceUrl: 'https://github.com/ziku-io/whitelabel-praxis/blob/af73195dfdc8857069b9c8b0b354a371fa247aa6/packages/compliance/src/frameworks/pme.ts',
  checkedOn,
  questions: [
    { key: 'hasEmployees', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475', checkedOn },
    // Artigo 106.º(5) classifies breach of any item in n.º 3 as "contra-ordenação
    // grave"; artigo 107.º(5) does the same for n.os 1, 2 and 4, which is where
    // the 60-day delivery deadline sits. Band is artigo 554.º(3)(a), the
    // under-500k turnover bracket, negligence: 6 UC to 12 UC. Read off the
    // official publication PDF, https://files.dre.pt/1s/2009/02/03000/0092601029.pdf
    { key: 'writtenEmploymentTerms', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475', checkedOn, when: [{ key: 'hasEmployees', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'ACT', article: 'Código do Trabalho, artigos 106.º e 107.º', fine: { min: 6, max: 12, unit: 'UC', bracket: 'graveSmallNegligence' } } },
    // Artigo 202.º(5): same classification, same band.
    { key: 'workingTimeRecords', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475', checkedOn, when: [{ key: 'hasEmployees', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'ACT', article: 'Código do Trabalho, artigo 202.º', fine: { min: 6, max: 12, unit: 'UC', bracket: 'graveSmallNegligence' } } },
    // Artigo 15.º(14): "Constitui contra-ordenação muito grave a violação do
    // disposto nos n.os 1 a 12." Band is CT artigo 554.º(4)(a), under-500k
    // turnover, negligence: 20 UC to 40 UC. Artigo 556.º(1) doubles the maximum
    // for safety and health breaches, so this one carries a 40 UC to 80 UC top.
    // Official PDF: https://files.dre.pt/1s/2009/09/17600/0616706192.pdf
    { key: 'occupationalRiskAssessment', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-56365379', checkedOn, when: [{ key: 'hasEmployees', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'ACT', article: 'Lei 102/2009, artigo 15.º', fine: { min: 20, max: 40, unit: 'UC', bracket: 'muitoGraveSmallNegligence' } } },
    // Artigos 108.º(6) and 110.º(7): both "contra-ordenação grave".
    { key: 'healthSurveillance', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-56365379', checkedOn, when: [{ key: 'hasEmployees', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'ACT / DGS', article: 'Lei 102/2009, artigos 108.º e 110.º', fine: { min: 6, max: 12, unit: 'UC', bracket: 'graveSmallNegligence' } } },
    // RCBE artigo 6.º(1), read verbatim on the consolidated text: "O incumprimento
    // pela sociedade do dever de manter um registo atualizado dos elementos de
    // identificação do beneficiário efetivo constitui contraordenação punível com
    // coima de (euro) 1 000 a (euro) 50 000."
    { key: 'beneficialOwnerCurrent', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2017-108031925', checkedOn, finding: { authority: 'IRN / RCBE', article: 'Lei 89/2017, artigo 6.º', fine: { min: 1_000, max: 50_000, unit: 'EUR', bracket: 'rcbe' } } },
    { key: 'processesPersonalData', type: 'choice', sourceUrl: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', checkedOn },
    // RGPD artigo 83.º(5), read verbatim on EUR-Lex: "coimas até 20 000 000 EUR
    // ou, no caso de uma empresa, até 4 % do seu volume de negócios anual a nível
    // mundial [...] consoante o montante que for mais elevado". The basic
    // principles (artigos 5.º and 6.º) and data-subject rights sit in this tier;
    // artigo 83.º(4) is the 10M / 2% tier for controller and processor duties.
    { key: 'gdprControls', type: 'choice', sourceUrl: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', checkedOn, when: [{ key: 'processesPersonalData', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'CNPD', article: 'RGPD, artigos 5.º, 6.º, 13.º, 14.º e 32.º', fine: { max: 20_000_000, unit: 'EUR', bracket: 'rgpdTier5' } } },
    { key: 'servesConsumers', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2005-34431675', checkedOn },
    // Artigo 9.º classifies but does not price: not providing the book is a
    // "contraordenação económica grave, punível nos termos do RJCE", and the RJCE
    // (Decreto-Lei 9/2021) scales the amount by company size. No single range can
    // be published without resolving that second table, so the card stays on the
    // classification and says the amount depends on it.
    { key: 'complaintsBook', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2005-34431675', checkedOn, when: [{ key: 'servesConsumers', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'ASAE', article: 'Decreto-Lei 156/2005, artigos 3.º, 5.º e 9.º (contraordenação económica grave, RJCE)' } },
    { key: 'subjectToAml', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2017-108024742', checkedOn },
    // Artigo 170.º(1)(e)(i): a legal person outside the financial and listed
    // non-financial sectors faces "coima de 3000 (euro) a 1 000 000 (euro)".
    // Artigo 170.º(2): for artigo 169.º offences the same amounts apply with the
    // maximum halved, hence 3 000 to 500 000. Artigo 171.º can raise the ceiling
    // to twice the economic benefit, which the bracket copy notes.
    { key: 'amlControls', type: 'choice', sourceUrl: 'https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2017-108024643', checkedOn, when: [{ key: 'subjectToAml', is: ['yes', 'partial', 'toConfirm'] }], finding: { authority: 'Autoridade setorial / UIF', article: 'Lei 83/2017, artigos 169.º e 170.º', fine: { min: 3_000, max: 500_000, unit: 'EUR', bracket: 'aml' } } },
  ],
};
