import assert from 'node:assert/strict';
import { REGIONS, matchAll, statusOf, type Answers, type Region } from '../src/funding/match';
import { COVERED_REGIONS, PROGRAMMES } from '../src/funding/programmes';

const now = new Date('2026-09-14T12:00:00.000Z');
const nieusync: Answers = {
  region: 'alentejo',
  cae: '70200',
  size: 'micro',
  ageYears: 0,
  filedAccounts: 'no',
  purposes: ['digital', 'hiring', 'workingCapital'],
  deMinimisUsed: 0,
};

const matches = matchAll(PROGRAMMES, nieusync, now);
const byId = (id: string) => matches.find((match) => match.programme.id === id) ?? assert.fail(`Missing ${id}`);

const sib = byId('alt2030-2026-16');
assert.equal(sib.outcome, 'ruledOut');
assert.deepEqual(sib.failed.sort(), ['eligibleCae', 'needsIes']);

const rfai = matchAll(PROGRAMMES, { ...nieusync, purposes: ['equipment'] }, now).find(
  (match) => match.programme.id === 'rfai',
);
assert.equal(rfai?.outcome, 'ruledOut');
assert.deepEqual(rfai?.failed, ['eligibleCae']);

assert.notEqual(byId('iefp-mais-emprego').outcome, 'ruledOut');
assert.equal(statusOf(PROGRAMMES.find((programme) => programme.id === 'alt2030-2026-16')!, now), 'closed');
assert.equal(statusOf(PROGRAMMES.find((programme) => programme.id === 'bpf-investeu-pme')!, now), 'rolling');

const ids = new Set<string>();
for (const programme of PROGRAMMES) {
  assert.match(programme.id, /^[a-z0-9-]+$/);
  assert.equal(ids.has(programme.id), false, `Duplicate programme ID: ${programme.id}`);
  ids.add(programme.id);
  assert.doesNotThrow(() => new URL(programme.applyUrl));
  assert.doesNotThrow(() => new URL(programme.sourceUrl));
  assert.equal(Number.isNaN(Date.parse(programme.checkedOn)), false, `Invalid checkedOn: ${programme.id}`);
  assert.equal(Date.parse(programme.checkedOn) <= now.getTime(), true, `Future checkedOn: ${programme.id}`);
  assert.equal(now.getTime() - Date.parse(programme.checkedOn) <= 120 * 24 * 60 * 60 * 1000, true, `Stale: ${programme.id}`);
  if (programme.amount?.min !== undefined && programme.amount.max !== undefined) {
    assert.equal(programme.amount.min <= programme.amount.max, true, `Invalid amount range: ${programme.id}`);
  }
  if (programme.rate !== undefined) assert.equal(programme.rate > 0 && programme.rate <= 1, true, `Invalid rate: ${programme.id}`);
}

// Coverage honesty. A region carrying regional programmes must be declared
// covered, or the page shows those programmes while also claiming the region is
// unswept. The reverse is allowed: a covered region may legitimately have no
// open regional call today.
const regionalProgrammes = new Map<Region, string[]>();
for (const programme of PROGRAMMES) {
  if (!programme.regional || programme.regions === 'all') continue;
  for (const region of programme.regions) {
    regionalProgrammes.set(region, [...(regionalProgrammes.get(region) ?? []), programme.id]);
  }
}
for (const [region, ids] of regionalProgrammes) {
  assert.equal(
    COVERED_REGIONS.includes(region),
    true,
    `${region} has programmes (${ids.join(', ')}) but is missing from COVERED_REGIONS, so the page would show them and call the region unswept`,
  );
}
for (const region of COVERED_REGIONS) {
  assert.equal(REGIONS.includes(region), true, `COVERED_REGIONS names an unknown region: ${region}`);
}
assert.equal(COVERED_REGIONS.length < REGIONS.length, true, 'every region is covered — delete the uncovered notice rather than leaving dead copy');

console.log('funding check OK');
