import { useEffect, useState, type ReactNode } from 'react';
import { ArrowSquareOut, CheckCircle, Info, Prohibit } from '@phosphor-icons/react';
import { Nav, Footer } from '../components/SiteChrome';
import { ToolFlow, type Details, type Step } from '../components/ToolFlow';
import { useParallax } from '../hooks/useParallax';
import { useT } from '../i18n';
import { matchAll, type Answers, type Match, type Purpose } from '../funding/match';
import { COVERED_REGIONS, PROGRAMMES } from '../funding/programmes';

type Copy = ReturnType<typeof useT<'funding'>>;

const blank: Answers = {
  region: 'unknown', cae: '', size: 'unknown', ageYears: 'unknown', filedAccounts: 'unknown', purposes: [], deMinimisUsed: 'unknown',
};

const fieldCls =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/45 transition focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)] focus:outline-none';
const labelCls = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/70';
// Normal sentence case, not the uppercase label treatment: this is read, not scanned.
const hintCls = 'mt-2 block text-xs normal-case leading-5 tracking-normal text-white/50';

export default function Funding() {
  const t = useT('funding');
  const [answers, setAnswers] = useState(blank);
  const [step, setStep] = useState<Step>('details');
  const [details, setDetails] = useState<Details>({ name: '', company: '', email: '', marketing: false });
  useParallax();

  const matches = matchAll(PROGRAMMES, answers);
  // A region we have not swept must say so. Silence would read as "no regional
  // programmes exist", which is the one wrong answer this page can give.
  const uncovered = answers.region !== 'unknown' && !COVERED_REGIONS.includes(answers.region);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((current) => ({ ...current, [key]: value }));
  const togglePurpose = (purpose: Purpose) =>
    set('purposes', answers.purposes.includes(purpose) ? answers.purposes.filter((item) => item !== purpose) : [...answers.purposes, purpose]);

  const open = matches.filter((match) => match.status !== 'closed');
  const groups = {
    worthChecking: open.filter((match) => match.outcome === 'worthChecking'),
    needsInfo: open.filter((match) => match.outcome === 'needsInfo'),
    previous: matches.filter((match) => match.status === 'closed' && match.outcome !== 'ruledOut'),
    ruledOut: matches.filter((match) => match.outcome === 'ruledOut'),
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      <section className="relative pb-14 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] glow glow-blue" />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">{t.label}</span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">{t.title}</h1>
          <p className="animate-fade-up max-w-xl text-[17px] leading-[1.75] text-white/85 [animation-delay:200ms]">{t.subtitle}</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container max-w-[980px]">
          <ToolFlow
            form="funding"
            step={step}
            onStep={setStep}
            details={details}
            onDetails={setDetails}
            // A region is the one answer the matcher cannot work without: with
            // none of them given, every programme comes back as "needs info",
            // which is a page of shrugs rather than a result.
            canSubmit={answers.region !== 'unknown' || answers.cae !== '' || answers.size !== 'unknown'}
            payload={() => ({
              answers,
              // What the visitor was actually shown. The programme list moves
              // as calls open and close, so the ids alone would not say what
              // this person saw on the day.
              matches: matches.map((match) => ({ id: match.programme.id, status: match.status, outcome: match.outcome })),
            })}
            questions={
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:grid-cols-2 md:p-9">
            <label>
              <span className={labelCls}>{t.region}</span>
              <select value={answers.region} onChange={(event) => set('region', event.target.value as Answers['region'])} className={`${fieldCls} bg-ink`}>
                {Object.entries(t.regions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <span className={hintCls}>{t.regionHint}</span>
            </label>

            <label>
              <span className={labelCls}>{t.cae}</span>
              <input
                value={answers.cae}
                maxLength={5}
                inputMode="numeric"
                onChange={(event) => set('cae', event.target.value.replace(/\D/g, ''))}
                placeholder="70200"
                className={fieldCls}
              />
              <span className={hintCls}>{t.caeHint}</span>
            </label>

            <label>
              <span className={labelCls}>{t.size}</span>
              <select value={answers.size} onChange={(event) => set('size', event.target.value as Answers['size'])} className={`${fieldCls} bg-ink`}>
                {Object.entries(t.sizes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <span className={hintCls}>{t.sizeHint}</span>
            </label>

            <label>
              <span className={labelCls}>{t.ageYears}</span>
              <input
                type="number"
                min="0"
                value={answers.ageYears === 'unknown' ? '' : answers.ageYears}
                onChange={(event) => set('ageYears', event.target.value === '' ? 'unknown' : Number(event.target.value))}
                className={fieldCls}
              />
              <span className={hintCls}>{t.ageHint}</span>
            </label>

            <label>
              <span className={labelCls}>{t.filedAccounts}</span>
              <select value={answers.filedAccounts} onChange={(event) => set('filedAccounts', event.target.value as Answers['filedAccounts'])} className={`${fieldCls} bg-ink`}>
                <option value="unknown">{t.unsure}</option>
                <option value="yes">{t.yes}</option>
                <option value="no">{t.no}</option>
              </select>
              <span className={hintCls}>{t.filedAccountsHint}</span>
            </label>

            <label>
              <span className={labelCls}>{t.deMinimis}</span>
              <input
                type="number"
                min="0"
                value={answers.deMinimisUsed === 'unknown' ? '' : answers.deMinimisUsed}
                onChange={(event) => set('deMinimisUsed', event.target.value === '' ? 'unknown' : Number(event.target.value))}
                className={fieldCls}
              />
              <span className={hintCls}>{t.deMinimisHint}</span>
            </label>

            <fieldset className="md:col-span-2">
              <legend className={labelCls}>{t.purpose}</legend>
              <p className="-mt-1 mb-3 text-xs leading-5 text-white/50">{t.purposeHint}</p>
              <div className="flex flex-wrap gap-2.5">
                {(Object.keys(t.purposes) as Purpose[]).map((purpose) => {
                  const on = answers.purposes.includes(purpose);
                  return (
                    <label key={purpose} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" checked={on} onChange={() => togglePurpose(purpose)} />
                      <span
                        className={`inline-block rounded-full border px-4 py-2 text-[13px] font-bold transition peer-focus-visible:ring-2 peer-focus-visible:ring-purple ${
                          on ? 'border-purple bg-purple/20 text-white' : 'border-white/20 text-white/75 hover:border-purple/50 hover:text-white'
                        }`}
                      >
                        {t.purposes[purpose]}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

          </div>
            }
            results={
              <div>
                <p className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-[1.7] text-white/70">
                  <Info size={18} weight="duotone" className="mt-0.5 shrink-0 text-white/45" />
                  {t.disclaimer}
                </p>

                {uncovered && answers.region !== 'unknown' && (
                  <p className="mt-4 rounded-xl border border-purple/40 bg-purple/[0.10] p-5 text-sm leading-[1.7] text-white/85">
                    {t.uncovered(t.regions[answers.region])}
                  </p>
                )}

                <Group title={t.worthChecking} tone="good" matches={groups.worthChecking} t={t} />
                <Group title={t.needsInfo} tone="info" matches={groups.needsInfo} t={t} />
                <Group title={t.previousEditions} tone="info" matches={groups.previous} t={t} />

                {groups.ruledOut.length > 0 && (
                  <details className="group mt-12">
                    <summary className="flex cursor-pointer list-none items-center gap-2.5 text-sm font-bold text-white/60 transition-colors hover:text-white/85">
                      <Prohibit size={17} weight="duotone" />
                      {t.ruledOut}
                      <span className="text-white/40">({groups.ruledOut.length})</span>
                    </summary>
                    <Group matches={groups.ruledOut} tone="muted" t={t} />
                  </details>
                )}
              </div>
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

const TONES = {
  good: { card: 'border-purple/30 bg-purple/[0.06]', icon: <CheckCircle size={17} weight="duotone" className="text-purple" /> },
  info: { card: 'border-white/10 bg-white/[0.03]', icon: null as ReactNode },
  muted: { card: 'border-white/[0.07] bg-white/[0.015] opacity-80', icon: null as ReactNode },
};

function Group({ title, matches, tone, t }: { title?: string; matches: Match[]; tone: keyof typeof TONES; t: Copy }) {
  if (!matches.length) return null;
  const { card, icon } = TONES[tone];

  return (
    <section className="mt-12">
      {title && (
        <h2 className="mb-5 flex items-center gap-2.5 font-display text-[26px] leading-none">
          {icon}
          {title}
        </h2>
      )}
      <div className="grid gap-4">
        {matches.map(({ programme, status, failed, unknown }) => {
          const copy = t.programmes[programme.id as keyof typeof t.programmes];
          const reasons = [...failed, ...unknown];
          return (
            <article key={programme.id} className={`rounded-2xl border p-6 transition duration-300 hover:border-purple/40 md:p-7 ${card}`}>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div className="min-w-0">
                  <h3 className="font-display text-[21px] leading-tight">{copy.name}</h3>
                  <p className="mt-1.5 text-sm leading-[1.6] text-white/65">{copy.summary}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                  {t[status]}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                <span className="font-display text-purple">{programme.entity}</span>
                {programme.amount && <span>{t.amount(programme.amount.min, programme.amount.max)}</span>}
                {programme.rate && <span>{t.rate(programme.rate)}</span>}
              </div>

              {reasons.length > 0 && (
                <ul className="mt-5 border-t border-white/10 pt-4">
                  {reasons.map((id) => (
                    <li key={id} className="py-1 text-sm leading-[1.65] text-white/70">
                      {t.gates[id as keyof typeof t.gates]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
                <a className="inline-flex items-center gap-1.5 text-purple transition-colors hover:text-white" href={programme.applyUrl} target="_blank" rel="noreferrer">
                  {t.apply}
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
                <a className="inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white" href={programme.sourceUrl} target="_blank" rel="noreferrer">
                  {t.source}
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
