export const REGIONS = ['norte', 'centro', 'lisboa', 'alentejo', 'algarve', 'acores', 'madeira'] as const;
export type Region = (typeof REGIONS)[number];

export const SIZES = ['micro', 'small', 'medium', 'large'] as const;
export type Size = (typeof SIZES)[number];

export const PURPOSES = ['hiring', 'digital', 'rnd', 'equipment', 'international', 'workingCapital', 'training', 'energy'] as const;
export type Purpose = (typeof PURPOSES)[number];

export type Known<T> = T | 'unknown';
export type Tri = 'yes' | 'no' | 'unknown';
export type Verdict = 'pass' | 'fail' | 'unknown';

export interface Answers {
  region: Known<Region>;
  cae: string;
  size: Known<Size>;
  ageYears: number | 'unknown';
  filedAccounts: Tri;
  purposes: Purpose[];
  deMinimisUsed: number | 'unknown';
}

export type Gate =
  | { kind: 'region'; id: string; regions: readonly Region[] }
  | { kind: 'caeIn'; id: string; prefixes: readonly string[] }
  | { kind: 'sizeIn'; id: string; sizes: readonly Size[] }
  | { kind: 'maxAge'; id: string; years: number }
  | { kind: 'filedAccounts'; id: string }
  | { kind: 'deMinimis'; id: string; needed: number }
  | { kind: 'manual'; id: string };

export type Window =
  | { kind: 'window'; opens?: string; closes?: string; nextExpected?: string }
  | { kind: 'rolling' }
  | { kind: 'annual'; month: number }
  | { kind: 'discontinued' };

export interface Programme {
  id: string;
  code?: string;
  entity: string;
  instrument: 'grant' | 'voucher' | 'taxBenefit' | 'taxCredit' | 'loan' | 'guarantee';
  /** Where the money can be spent. Not the same as whose programme it is. */
  regions: readonly Region[] | 'all';
  /**
   * True only for a region's own operational programme (Alentejo 2030, Norte
   * 2030…). A national call with a mainland-only footprint is still national,
   * so listing it does not mean that region has been swept. COVERED_REGIONS is
   * checked against this, not against `regions`.
   */
  regional?: boolean;
  purposes: readonly Purpose[];
  amount?: { min?: number; max?: number };
  rate?: number;
  window: Window;
  applyUrl: string;
  sourceUrl: string;
  checkedOn: string;
  gates: readonly Gate[];
}

export type Status = 'open' | 'closed' | 'rolling' | 'annual';
export type Outcome = 'worthChecking' | 'needsInfo' | 'ruledOut';

export interface Match {
  programme: Programme;
  status: Status;
  outcome: Outcome;
  failed: string[];
  unknown: string[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unknown funding gate: ${JSON.stringify(value)}`);
};

export const caeMatches = (cae: string, prefixes: readonly string[]) =>
  prefixes.some((prefix) => cae.startsWith(prefix));

export function evaluateGate(gate: Gate, answers: Answers): Verdict {
  switch (gate.kind) {
    case 'region':
      return answers.region === 'unknown' ? 'unknown' : gate.regions.includes(answers.region) ? 'pass' : 'fail';
    case 'caeIn':
      return answers.cae === '' ? 'unknown' : caeMatches(answers.cae, gate.prefixes) ? 'pass' : 'fail';
    case 'sizeIn':
      return answers.size === 'unknown' ? 'unknown' : gate.sizes.includes(answers.size) ? 'pass' : 'fail';
    case 'maxAge':
      return answers.ageYears === 'unknown' ? 'unknown' : answers.ageYears <= gate.years ? 'pass' : 'fail';
    case 'filedAccounts':
      return answers.filedAccounts === 'unknown' ? 'unknown' : answers.filedAccounts === 'yes' ? 'pass' : 'fail';
    case 'deMinimis':
      if (answers.deMinimisUsed === 'unknown') return 'unknown';
      if (answers.deMinimisUsed >= 300_000) return 'fail';
      return answers.deMinimisUsed + gate.needed <= 300_000 ? 'pass' : 'unknown';
    case 'manual':
      return 'unknown';
    default:
      return assertNever(gate);
  }
}

export function statusOf(programme: Programme, now = new Date()): Status {
  switch (programme.window.kind) {
    case 'rolling':
      return 'rolling';
    case 'annual':
      return 'annual';
    case 'discontinued':
      return 'closed';
    case 'window': {
      const today = now.toISOString().slice(0, 10);
      return (programme.window.opens && today < programme.window.opens) ||
        (programme.window.closes && today > programme.window.closes)
        ? 'closed'
        : 'open';
    }
    default:
      return assertNever(programme.window);
  }
}

export function matchAll(programmes: readonly Programme[], answers: Answers, now = new Date()): Match[] {
  return programmes
    .filter((programme) => programme.window.kind !== 'discontinued')
    .filter((programme) => programme.purposes.some((purpose) => answers.purposes.includes(purpose)))
    .map((programme) => {
      const verdicts = programme.gates.map((gate) => ({ id: gate.id, verdict: evaluateGate(gate, answers) }));
      const failed = verdicts.filter(({ verdict }) => verdict === 'fail').map(({ id }) => id);
      const unknown = verdicts.filter(({ verdict }) => verdict === 'unknown').map(({ id }) => id);
      return {
        programme,
        status: statusOf(programme, now),
        outcome: failed.length ? 'ruledOut' : unknown.length ? 'needsInfo' : 'worthChecking',
        failed,
        unknown,
      };
    });
}
