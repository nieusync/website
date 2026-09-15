import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import L from './L';
import { subscribe } from './Forms';
import { post } from '../api';
import { useBlogUrl } from '../hooks/useArticles';
import { useT } from '../i18n';

/**
 * The three steps every tool on this site runs through: say who you are, answer
 * the questions, read the result.
 *
 * ## Why the details come first
 *
 * A tool that asks afterwards is asking someone who already has what they came
 * for, and most of them close the tab. Asking first is the trade stated plainly:
 * the answers are free, the introduction is the price. Nothing is asked twice
 * and nothing is asked that the tool does not need.
 *
 * ## The result is never held hostage
 *
 * Storage runs on the way to step three and its failure is swallowed on
 * purpose. An API that is down, a blocked request, a browser refusing the
 * cross-origin call: none of those are the visitor's problem, and none of them
 * are worth showing a stranger an error where their answers should be.
 *
 * Consent is the exception. The API refuses a submission without it, so a
 * missing tick is not a storage failure, it is a submission that was never
 * meant to happen.
 */

export interface Details {
  name: string;
  company: string;
  email: string;
  marketing: boolean;
}

export type Step = 'details' | 'questions' | 'results';

const fieldCls =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/45 transition focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)] focus:outline-none';
const labelCls = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/70';

/**
 * Hands the submission to the API, and says nothing to anyone if that failed.
 *
 * Deliberately not awaited by the caller's render path: the visitor moves to
 * their results the moment they ask for them, whatever this does. The console
 * is where a failure is recorded, because there is nobody on this page who
 * could act on it.
 */
async function store(form: string, details: Details, payload: Record<string, unknown>) {
  try {
    await post('/api/submissions', {
      form,
      name: details.name,
      company: details.company,
      email: details.email,
      payload,
      // The tick that lets the row exist at all. The gate is the checkbox in
      // the form below; this is the same answer restated to the API, which
      // refuses the submission without it.
      consent: true,
      marketing: details.marketing,
    });
  } catch (error) {
    console.error('tool submission was not stored', error);
  }
}

export function ToolFlow({
  form,
  step,
  onStep,
  details,
  onDetails,
  questions,
  results,
  canSubmit,
  payload,
}: {
  /** The key this tool's rows carry in the database, e.g. 'funding'. */
  form: string;
  step: Step;
  onStep: (step: Step) => void;
  details: Details;
  onDetails: (details: Details) => void;
  questions: ReactNode;
  results: ReactNode;
  /** Whether the questions have been answered enough to be worth a result. */
  canSubmit: boolean;
  /** Everything worth keeping, read once when the visitor asks for results. */
  payload: () => Record<string, unknown>;
}) {
  const t = useT('tools');
  const blogUrl = useBlogUrl();
  const [consent, setConsent] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  // Every step is a new page as far as the reader is concerned, and landing
  // halfway down the previous one reads as nothing having happened. Skipped on
  // the first render so arriving at the page does not fight the browser's own
  // restoration of a scroll position.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const toResults = () => {
    onStep('results');
    // Fire and forget, both of them. See the note at the top of this file.
    void store(form, details, payload());
    if (details.marketing) {
      // `label` tags the member in Ghost admin, so staff can see the tool they
      // came from rather than one undifferentiated pile of signups.
      subscribe(blogUrl, details.email, `tool-${form}`).catch((error) =>
        console.error('newsletter signup failed', error),
      );
    }
  };

  return (
    <div ref={top} className="scroll-mt-28">
      <Steps step={step} />

      {step === 'details' && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onStep('questions');
          }}
          className="animate-fade-up grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:grid-cols-2 md:p-9"
        >
          <p className="text-[15px] leading-[1.7] text-white/75 md:col-span-2">{t.detailsIntro}</p>

          <label>
            <span className={labelCls}>{t.name}</span>
            <input
              required
              value={details.name}
              autoComplete="name"
              onChange={(event) => onDetails({ ...details, name: event.target.value })}
              className={fieldCls}
            />
          </label>

          <label>
            <span className={labelCls}>{t.company}</span>
            <input
              value={details.company}
              autoComplete="organization"
              onChange={(event) => onDetails({ ...details, company: event.target.value })}
              className={fieldCls}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelCls}>{t.email}</span>
            <input
              required
              type="email"
              value={details.email}
              autoComplete="email"
              onChange={(event) => onDetails({ ...details, email: event.target.value })}
              className={fieldCls}
            />
          </label>

          <div className="grid gap-4 md:col-span-2">
            <Check checked={consent} onChange={setConsent} required>
              {t.consent.before}
              <L to="legal" param="terms-and-conditions" className="text-purple underline underline-offset-4 hover:text-white">
                {t.consent.terms}
              </L>
              {t.consent.between}
              <L to="legal" param="privacy-policy" className="text-purple underline underline-offset-4 hover:text-white">
                {t.consent.privacy}
              </L>
              {t.consent.after}
            </Check>

            <Check
              checked={details.marketing}
              onChange={(marketing) => onDetails({ ...details, marketing })}
            >
              {t.marketing}
            </Check>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!consent}
              className="btn-gradient inline-flex cursor-pointer items-center gap-2 border-none px-8 py-3.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.start}
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </form>
      )}

      {step === 'questions' && (
        <>
          {questions}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={toResults}
              disabled={!canSubmit}
              className="btn-gradient inline-flex cursor-pointer items-center gap-2 border-none px-8 py-3.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.seeResults}
              <ArrowRight size={16} weight="bold" />
            </button>
            {!canSubmit && <span className="text-sm text-white/55">{t.answerFirst}</span>}
          </div>
        </>
      )}

      {step === 'results' && (
        <>
          {results}
          <button
            type="button"
            onClick={() => onStep('questions')}
            className="mt-12 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-[13px] font-bold text-white/75 transition hover:border-purple/50 hover:text-white"
          >
            <ArrowLeft size={15} weight="bold" />
            {t.changeAnswers}
          </button>
        </>
      )}
    </div>
  );
}

/**
 * Where the visitor is, and how much is left. Three steps is short enough that
 * the whole thing fits on one line, so it is a row of labels rather than a
 * progress bar: a bar says "some fraction", this says which step.
 */
function Steps({ step }: { step: Step }) {
  const t = useT('tools');
  const order: Step[] = ['details', 'questions', 'results'];
  const at = order.indexOf(step);

  return (
    <ol className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
      {order.map((name, index) => {
        const done = index < at;
        const here = index === at;
        return (
          <li key={name} className="flex items-center gap-3">
            <span className={here ? 'font-bold text-white' : done ? 'text-purple' : 'text-white/40'}>
              <span className="mr-2 font-display">{index + 1}</span>
              {t.steps[name]}
            </span>
            {index < order.length - 1 && <span aria-hidden className="text-white/25">/</span>}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A checkbox big enough to hit on a phone, with the label as its target.
 *
 * `required` is on the input as well as gating the button, so a visitor who
 * submits with the keyboard gets the browser's own message rather than a button
 * that silently does nothing.
 */
function Check({
  checked,
  onChange,
  required,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.65] text-white/75">
      <input
        type="checkbox"
        required={required}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-purple"
      />
      <span>{children}</span>
    </label>
  );
}
