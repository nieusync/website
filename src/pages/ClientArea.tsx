import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LockKey } from '@phosphor-icons/react';
import { useT } from '../i18n';

export default function ClientArea() {
  const t = useT('site');
  const c = t.clientAreaPage;
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = c.documentTitle;
  }, [c.documentTitle]);

  // ponytail: mock sign-in. There is nothing to authenticate against yet.
  // Point the form at the platform app once it is live on its own domain.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  const fieldCls =
    'w-full rounded-xl border-white/15 bg-white/[0.04] text-white placeholder:text-white/50 focus:border-purple focus:shadow-[0_0_0_3px_rgba(159,142,194,0.18)]';

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-white">
      <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] animate-drift glow glow-blue" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] animate-drift glow glow-purple [animation-delay:-9s]" />

      <div className="container relative flex min-h-screen items-center justify-center py-16">
        <div className="animate-fade-up w-full max-w-[440px]">
          <Link
            to="/demo"
            className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-purple"
          >
            <ArrowLeft size={14} weight="bold" />
            {c.back}
          </Link>

          <img
            src="/assets/logo_h_w_nbg.png"
            alt="Nieusync"
            className="mx-auto mb-10 h-9 w-auto"
            loading="lazy"
          />

          <span className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-purple">
            <LockKey size={15} weight="duotone" />
            {c.label}
          </span>
          <h1 className="mb-4 text-center font-display text-[clamp(32px,4vw,48px)] leading-[1.05]">
            {c.title}
          </h1>
          <p className="mb-9 text-center text-[15px] leading-[1.7] text-white/80">{c.subtitle}</p>

          <form onSubmit={onSubmit}>
            <label htmlFor="ca-email" className="mb-2 text-[11px] tracking-[0.14em] text-white/80">
              {c.email}
            </label>
            <input
              id="ca-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={c.emailPlaceholder}
              className={`${fieldCls} mb-5`}
            />

            <label
              htmlFor="ca-password"
              className="mb-2 text-[11px] tracking-[0.14em] text-white/80"
            >
              {c.password}
            </label>
            <input
              id="ca-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={`${fieldCls} mb-6`}
            />

            <button
              type="submit"
              className="group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-none bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)]"
            >
              {c.submit}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            {notice && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-purple/30 bg-purple/10 px-4 py-3 text-sm leading-[1.6] text-white/90"
              >
                {c.preview}
              </p>
            )}
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm">
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="cursor-pointer border-none bg-transparent p-0 text-white/80 transition-colors hover:text-purple"
            >
              {c.forgot}
            </button>
            <span className="text-white/70">
              {c.noAccount}{' '}
              <Link to="/demo/contact" className="font-bold text-purple">
                {c.noAccountCta}
              </Link>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
