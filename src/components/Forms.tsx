import { useState, type FormEvent } from 'react';
import { ArrowRight, EnvelopeSimple, FilePdf } from '@phosphor-icons/react';
import { useT } from '../i18n';

export const CONTACT_EMAIL = 'geral@nieusync.com';

// ponytail: no backend on this site. Set VITE_FORM_ENDPOINT (Formspree, Basin,
// a Worker: anything that accepts a JSON POST) and the forms post to it;
// without it they hand the message to the visitor's mail client instead.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

async function submit(subject: string, data: Record<string, string>) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...data }),
    });
    if (!res.ok) throw new Error(`form endpoint responded ${res.status}`);
    return;
  }

  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const fieldCls =
  'w-full rounded-xl border-white/15 bg-white/[0.04] text-white placeholder:text-white/25 focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)]';
const labelCls = 'mb-2 text-[11px] tracking-[0.14em] text-white/45';

export function ContactForm() {
  const t = useT('site');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus('sending');
    try {
      await submit(t.contact.mailSubject, {
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
        {status === 'error' && <p className="text-sm text-white/60">{t.contact.error}</p>}
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const t = useT('site');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus('sending');
    try {
      await submit(t.newsletter.mailSubject, {
        email: String(f.get('email') ?? ''),
        guide: t.newsletter.title,
      });
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
          <p className="text-[15px] leading-[1.7] text-white/50">{t.newsletter.desc}</p>
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

          <p className="mt-4 text-xs leading-[1.6] text-white/30">{t.newsletter.consent}</p>
          {status === 'sent' && <p className="mt-3 text-sm text-purple">{t.newsletter.success}</p>}
          {status === 'error' && (
            <p className="mt-3 text-sm text-white/60">{t.newsletter.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
