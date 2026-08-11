import { useState, type FormEvent } from 'react';
import { ArrowRight, EnvelopeSimple, FilePdf } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useBlogUrl } from '../hooks/useArticles';

export const CONTACT_EMAIL = 'geral@nieusync.com';

// The staff API, which turns a submission into a lead in the pipeline. Same
// default as internal/ and app/: an empty base means same-origin, which only
// happens behind a dev proxy.
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://api.nieusync.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

async function submit(data: Record<string, string>) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // `website` is the honeypot the API checks: always empty from a real form.
    body: JSON.stringify({ website: '', ...data }),
  });
  if (!res.ok) throw new Error(`/api/contact responded ${res.status}`);
}

// Ghost's own members endpoint, the one its `data-members-form` posts to. It is
// public and unauthenticated by design, and it sends the confirmation email
// itself, so subscribing is double opt-in with no key and no backend here.
// `label` tags the member in Ghost admin so staff can see where they signed up.
//
// `blogUrl` is passed in rather than imported because the two blogs have
// separate member databases: posting to the wrong one does not fail, it just
// quietly files an English reader on the Portuguese list.
async function subscribe(blogUrl: string, email: string, label: string) {
  const res = await fetch(`${blogUrl}/members/api/send-magic-link/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      emailType: 'subscribe',
      labels: [label],
      // Ghost rejects the request when this field is filled: a bot trap it
      // expects to be present and empty.
      honeypot: '',
    }),
  });
  if (!res.ok) throw new Error(`ghost members responded ${res.status}`);
}

const fieldCls =
  'w-full rounded-xl border-white/15 bg-white/[0.04] text-white placeholder:text-white/50 focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)]';
const labelCls = 'mb-2 text-[11px] tracking-[0.14em] text-white/80';

export function ContactForm() {
  const t = useT('site');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus('sending');
    try {
      await submit({
        name: String(f.get('name') ?? ''),
        company: String(f.get('company') ?? ''),
        email: String(f.get('email') ?? ''),
        message: String(f.get('message') ?? ''),
      });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className={labelCls}>
          {t.contact.name}
        </label>
        <input id="contact-name" name="name" required autoComplete="name" className={fieldCls} />
      </div>
      <div>
        <label htmlFor="contact-company" className={labelCls}>
          {t.contact.company}
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          className={fieldCls}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="contact-email" className={labelCls}>
          {t.contact.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldCls}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="contact-message" className={labelCls}>
          {t.contact.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={t.contact.messagePlaceholder}
          className={fieldCls}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full border-none bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? t.contact.sending : t.contact.submit}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        {status === 'sent' && <p className="text-sm text-purple">{t.contact.success}</p>}
        {status === 'error' && <p className="text-sm text-white/85">{t.contact.error}</p>}
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const t = useT('site');
  const blogUrl = useBlogUrl();
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus('sending');
    try {
      await subscribe(blogUrl, String(f.get('email') ?? ''), 'website-newsletter');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
      <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-purple">
            <FilePdf size={16} weight="duotone" />
            {t.newsletter.label}
          </span>
          <h2 className="mb-5 font-display text-[clamp(26px,3.5vw,40px)] leading-[1.1] text-white">
            {t.newsletter.title}
          </h2>
        </div>

        <form onSubmit={onSubmit}>
          <label htmlFor="news-email" className={labelCls}>
            {t.contact.email}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="news-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t.newsletter.emailPlaceholder}
              className={fieldCls}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex min-h-[48px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-white px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-blue transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <EnvelopeSimple size={16} weight="bold" />
              {status === 'sending' ? t.newsletter.sending : t.newsletter.submit}
            </button>
          </div>

          <p className="mt-4 text-xs leading-[1.6] text-white/70">{t.newsletter.consent}</p>
          {status === 'sent' && <p className="mt-3 text-sm text-purple">{t.newsletter.success}</p>}
          {status === 'error' && (
            <p className="mt-3 text-sm text-white/85">{t.newsletter.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
