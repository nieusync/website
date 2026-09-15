import assert from 'node:assert/strict';
import { evaluateFramework, isVisible } from '../src/tools/evaluate';
import { PME } from '../src/tools/pme';
import { RGPC } from '../src/tools/rgpc';
import type { Framework, ToolAnswers } from '../src/tools/types';

const now = new Date('2026-09-14T12:00:00.000Z');
const frameworks: Framework[] = [PME, RGPC];
const gaps = (framework: Framework, answers: ToolAnswers) =>
  evaluateFramework(framework, answers).filter((finding) => finding.status === 'possibleGap').map((finding) => finding.question.key);
const unknowns = (framework: Framework, answers: ToolAnswers) =>
  evaluateFramework(framework, answers).filter((finding) => finding.status === 'needsConfirmation').map((finding) => finding.question.key);

// An untouched page accuses nobody: unanswered is silence, not a finding.
for (const framework of frameworks) {
  assert.deepEqual(gaps(framework, {}), [], `${framework.id}: empty answers must produce no gap`);
  assert.deepEqual(unknowns(framework, {}), [], `${framework.id}: empty answers must produce no unknown`);
}

// Answer semantics. "no" and "partial" are gaps, "toConfirm" never is.
assert.deepEqual(gaps(PME, { beneficialOwnerCurrent: 'no' }), ['beneficialOwnerCurrent']);
assert.deepEqual(gaps(PME, { beneficialOwnerCurrent: 'partial' }), ['beneficialOwnerCurrent']);
assert.deepEqual(gaps(PME, { beneficialOwnerCurrent: 'toConfirm' }), []);
assert.deepEqual(unknowns(PME, { beneficialOwnerCurrent: 'toConfirm' }), ['beneficialOwnerCurrent']);
assert.deepEqual(gaps(PME, { beneficialOwnerCurrent: 'yes' }), []);

// Conditional questions stay hidden until their parent answer makes them apply.
const timeRecords = PME.questions.find((question) => question.key === 'workingTimeRecords')!;
assert.equal(isVisible(timeRecords, {}), false, 'labour questions must not show before the employer question is answered');
assert.equal(isVisible(timeRecords, { hasEmployees: 'no' }), false);
assert.equal(isVisible(timeRecords, { hasEmployees: 'yes' }), true);
assert.deepEqual(gaps(PME, { hasEmployees: 'no', workingTimeRecords: 'no' }), [], 'a hidden question cannot produce a gap');

// RGPC article 2: 50 workers in Portugal, or a regulator whatever its size.
const officer = RGPC.questions.find((question) => question.key === 'hasComplianceOfficer')!;
assert.equal(isVisible(officer, { seatInPortugal: 'yes', employeeCount: 49 }), false, 'RGPC must not reach a 49-worker company');
assert.equal(isVisible(officer, { seatInPortugal: 'yes', employeeCount: 50 }), true, 'RGPC reaches a 50-worker company');
assert.deepEqual(gaps(RGPC, { seatInPortugal: 'yes', employeeCount: 49, hasComplianceOfficer: 'no' }), [], 'out of scope means no finding');
assert.deepEqual(gaps(RGPC, { seatInPortugal: 'yes', employeeCount: 50, hasComplianceOfficer: 'no' }), ['hasComplianceOfficer']);

// Data integrity. Every claim the page makes has to carry its source.
for (const framework of frameworks) {
  const seen = new Set<string>();
  framework.questions.forEach((question, index) => {
    assert.match(question.key, /^[a-zA-Z][a-zA-Z0-9]*$/, `${framework.id}.${question.key}: bad key`);
    assert.equal(seen.has(question.key), false, `${framework.id}: duplicate key ${question.key}`);
    seen.add(question.key);
    assert.doesNotThrow(() => new URL(question.sourceUrl), `${framework.id}.${question.key}: bad source URL`);
    assert.equal(new URL(question.sourceUrl).protocol, 'https:', `${framework.id}.${question.key}: source must be https`);
    assert.equal(Number.isNaN(Date.parse(question.checkedOn)), false, `${framework.id}.${question.key}: bad checkedOn`);
    assert.equal(Date.parse(question.checkedOn) <= now.getTime(), true, `${framework.id}.${question.key}: future checkedOn`);
    assert.equal(now.getTime() - Date.parse(question.checkedOn) <= 120 * 24 * 60 * 60 * 1000, true, `${framework.id}.${question.key}: stale`);

    // A condition may only name a question asked before it, or the page can
    // gate on an answer the visitor was never given a chance to give.
    for (const condition of question.when ?? []) {
      const parent = framework.questions.findIndex((other) => other.key === condition.key);
      assert.notEqual(parent, -1, `${framework.id}.${question.key}: condition names unknown question ${condition.key}`);
      assert.equal(parent < index, true, `${framework.id}.${question.key}: condition names a later question`);
    }

    // Every reader-facing accusation cites an authority and an article, and any
    // fine is a real range. Absent is fine; wrong is not.
    if (question.finding) {
      assert.ok(question.finding.authority.length, `${framework.id}.${question.key}: finding needs an authority`);
      assert.ok(question.finding.article.length, `${framework.id}.${question.key}: finding needs an article`);
      if (question.finding.fine) {
        const { min, max, unit, bracket } = question.finding.fine;
        assert.equal(max > 0, true, `${framework.id}.${question.key}: fine needs a positive maximum`);
        // `min` is absent where the statute sets only a ceiling, as the RGPD
        // does. Absent is fine; negative or above the maximum is not.
        if (min !== undefined) {
          assert.equal(min >= 0, true, `${framework.id}.${question.key}: negative fine`);
          assert.equal(min <= max, true, `${framework.id}.${question.key}: inverted fine range`);
        }
        assert.ok(unit === 'EUR' || unit === 'UC', `${framework.id}.${question.key}: fine needs an explicit unit`);
        // A UC figure is meaningless on its own: the band depends on turnover
        // and on negligence versus intent, so it may not be published without
        // the bracket that says which company it belongs to.
        if (unit === 'UC') {
          assert.ok(bracket, `${framework.id}.${question.key}: a UC fine must name its turnover bracket`);
        }
      }
    }
  });
}

// The public screeners are curated subsets, not the internal audit programmes
// (138 PME procedures, 85 RGPC). A bulk import would be a legal problem, not a
// UX one, so the size is pinned.
assert.equal(PME.questions.length <= 20, true, `PME screener has grown to ${PME.questions.length} questions`);
assert.equal(RGPC.questions.length <= 20, true, `RGPC screener has grown to ${RGPC.questions.length} questions`);

// The two labour bands were read off the official publication PDF of the Código
// do Trabalho, artigo 554.º(3)(a) and (4)(a). They are the figures most likely
// to be "corrected" from memory by a later edit, so they are pinned here with
// the source in the message.
const ct = 'Código do Trabalho art. 554.º, https://files.dre.pt/1s/2009/02/03000/0092601029.pdf';
const fineOf = (key: string) => PME.questions.find((question) => question.key === key)?.finding?.fine;
assert.deepEqual(fineOf('workingTimeRecords'), { min: 6, max: 12, unit: 'UC', bracket: 'graveSmallNegligence' }, `grave band is 6 UC to 12 UC, ${ct}`);
assert.deepEqual(fineOf('occupationalRiskAssessment'), { min: 20, max: 40, unit: 'UC', bracket: 'muitoGraveSmallNegligence' }, `muito grave band is 20 UC to 40 UC, ${ct}`);

// RGPC artigo 20.º, read verbatim on DR. The odd 44 891,81 is the statute's own
// figure, not a typo, and it is exactly the kind of number a later edit rounds.
const rgpcFine = (key: string) => RGPC.questions.find((question) => question.key === key)?.finding?.fine;
const rgpc = 'RGPC art. 20.º, https://diariodarepublica.pt/dr/detalhe/decreto-lei/109-e-2021-175659840';
assert.deepEqual(rgpcFine('hasPreventionPlan'), { min: 2_000, max: 44_891.81, unit: 'EUR', bracket: 'rgpcCore' }, `core tier is 2000 to 44891.81, ${rgpc}`);
assert.deepEqual(rgpcFine('hasAnnualReport'), { min: 1_000, max: 25_000, unit: 'EUR', bracket: 'rgpcReporting' }, `reporting tier is 1000 to 25000, ${rgpc}`);

// RGPD artigo 83.º(5): a ceiling with no floor, so `min` must stay absent or the
// page invents a minimum the regulation does not set.
const gdpr = fineOf('gdprControls');
assert.equal(gdpr?.max, 20_000_000, 'RGPD art. 83.º(5) ceiling is 20M, https://eur-lex.europa.eu/eli/reg/2016/679/oj');
assert.equal(gdpr?.min, undefined, 'RGPD art. 83.º sets no minimum, so none may be published');

// RCBE artigo 6.º(1), read verbatim on the consolidated text.
assert.deepEqual(
  fineOf('beneficialOwnerCurrent'),
  { min: 1_000, max: 50_000, unit: 'EUR', bracket: 'rcbe' },
  'RCBE art. 6.º(1) is 1000 to 50000, https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2017-108031925',
);

// The complaints book delegates its amount to the RJCE, which scales by company
// size. Publishing a range here would mean inventing one, so the absence is
// deliberate and pinned.
assert.equal(fineOf('complaintsBook'), undefined, 'DL 156/2005 art. 9.º prices via the RJCE size table, so no single range may be published');

// Lei 83/2017 art. 170.º(1)(e)(i) is 3000 to 1 000 000, and art. 170.º(2) halves
// the maximum for art. 169.º offences. The halving is the easy half to lose.
assert.deepEqual(
  fineOf('amlControls'),
  { min: 3_000, max: 500_000, unit: 'EUR', bracket: 'aml' },
  'AML art. 170.º(1)(e) halved by (2) is 3000 to 500000, https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2017-108024643',
);

console.log('tools check OK');
