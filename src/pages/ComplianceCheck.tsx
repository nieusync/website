import { useEffect, useState } from 'react';
import { ArrowSquareOut, Info, WarningCircle } from '@phosphor-icons/react';
import { Nav, Footer } from '../components/SiteChrome';
import { useParallax } from '../hooks/useParallax';
import { useT } from '../i18n';
import { evaluateFramework, isVisible } from '../tools/evaluate';
import type { Answer, Finding, Framework, ToolAnswers } from '../tools/types';

type Copy = ReturnType<typeof useT<'tools'>>;

const ANSWERS: Answer[] = ['yes', 'no', 'partial', 'toConfirm'];

export function ComplianceCheck({ framework, kind }: { framework: Framework; kind: 'pme' | 'rgpc' }) {
  const t = useT('tools');
  const [answers, setAnswers] = useState<ToolAnswers>({});
  useParallax();

  const page = t[kind];
  const visible = framework.questions.filter((question) => isVisible(question, answers));
  const findings = evaluateFramework(framework, answers);
  const possible = findings.filter((finding) => finding.status === 'possibleGap');
  const unknown = findings.filter((finding) => finding.status === 'needsConfirmation');
  const answered = visible.some((question) => answers[question.key] !== undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = page.documentTitle;
  }, [page.documentTitle]);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      <section className="relative pb-14 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] glow glow-blue" />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">{page.label}</span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">{page.title}</h1>
          <p className="animate-fade-up max-w-xl text-[17px] leading-[1.75] text-white/85 [animation-delay:200ms]">{page.subtitle}</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container max-w-[820px]">
          <p className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-[1.7] text-white/70">
            <Info size={18} weight="duotone" className="mt-0.5 shrink-0 text-white/45" />
            {t.disclaimer}
          </p>

          {/* Questions are rows, not cards: they are a sequence to work through,
              and boxing each one would make eleven equal-weight containers. */}
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {visible.map((question) => (
              <div key={question.key} className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
                <p className="text-[15px] leading-[1.6] text-white/90">{t.questions[question.key as keyof typeof t.questions]}</p>

                {question.type === 'number' ? (
                  <input
                    type="number"
                    min="0"
                    value={typeof answers[question.key] === 'number' ? answers[question.key] : ''}
                    onChange={(event) =>
                      setAnswers((current) => ({ ...current, [question.key]: event.target.value === '' ? undefined : Number(event.target.value) }))
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[15px] text-white transition focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)] focus:outline-none md:w-32"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {ANSWERS.map((answer) => {
                      const on = answers[question.key] === answer;
                      return (
                        <button
                          key={answer}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setAnswers((current) => ({ ...current, [question.key]: answer }))}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition active:scale-[0.98] ${
                            on ? 'border-purple bg-purple/20 text-white' : 'border-white/20 text-white/70 hover:border-purple/50 hover:text-white'
                          }`}
                        >
                          {t[answer]}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Findings title={t.possibleGaps} findings={possible} tone="gap" t={t} />
          <Findings title={t.needsConfirmation} findings={unknown} tone="info" t={t} />

          {answered && !possible.length && !unknown.length && (
            <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-[1.7] text-white/70">{t.noFindings}</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Findings({ title, findings, tone, t }: { title: string; findings: Finding[]; tone: 'gap' | 'info'; t: Copy }) {
  if (!findings.length) return null;
  const gap = tone === 'gap';

  return (
    <section className="mt-12">
      <h2 className="mb-5 flex items-center gap-2.5 font-display text-[26px] leading-none">
        {gap && <WarningCircle size={20} weight="duotone" className="text-purple" />}
        {title}
      </h2>
      <div className="grid gap-4">
        {findings.map(({ question }) => (
          <article
            key={question.key}
            className={`rounded-2xl border p-6 transition duration-300 hover:border-purple/40 ${
              gap ? 'border-purple/30 bg-purple/[0.06]' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <h3 className="text-[16px] font-bold leading-[1.45]">{t.questions[question.key as keyof typeof t.questions]}</h3>

            {question.finding && (
              <>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <span className="font-display text-purple">{question.finding.authority}</span>
                  <span className="text-white/65">{question.finding.article}</span>
                </div>
                {question.finding.fine ? (
                  <>
                    <p className="mt-3 text-[15px] font-bold leading-[1.5] text-white">
                      {question.finding.fine.min === undefined
                        ? t.fineUpTo(question.finding.fine.max)
                        : question.finding.fine.unit === 'UC'
                          ? t.fineUc(question.finding.fine.min, question.finding.fine.max)
                          : t.fine(question.finding.fine.min, question.finding.fine.max)}
                    </p>
                    {question.finding.fine.bracket && (
                      <p className="mt-2 text-sm leading-[1.65] text-white/65">
                        {t.brackets[question.finding.fine.bracket as keyof typeof t.brackets]}
                      </p>
                    )}
                    {question.finding.fine.unit === 'UC' && <p className="mt-2 text-xs leading-[1.6] text-white/50">{t.ucNote}</p>}
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-[1.65] text-white/70">{t.noFine}</p>
                )}
              </>
            )}

            <a
              href={question.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-purple transition-colors hover:text-white"
            >
              {t.source}
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
