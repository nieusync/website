import { useEffect } from 'react';
import { useT, LanguageToggle } from '../i18n';

// ponytail: port of the old static site `nieusync/landingpage` (GitHub Pages)
// into the app. That repo is gone — this page is the only version.
export default function Landing() {
  const t = useT('landing');

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-grad-main px-6">
      {/* Tech texture + drifting glows behind the content */}
      <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] animate-drift rounded-full bg-purple/40 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[380px] w-[380px] animate-drift rounded-full bg-white/10 blur-[110px] [animation-delay:-9s]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px]">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-white/10">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
        </div>
      </div>

      <LanguageToggle className="absolute right-6 top-6 z-10 text-white" />

      <div className="animate-fade-up relative mb-10">
        <img
          className="w-[260px] max-w-[65vw] animate-pulse-soft"
          src="/assets/logo_v_w_nbg.png"
          alt="NIEUSYNC"
        />
      </div>

      {/* font-sans: index.css forces 'Magistral' on h1 — the landing uses Montserrat 800 */}
      <h1 className="animate-fade-up relative mb-5 max-w-[700px] text-center font-sans text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-white [animation-delay:150ms]">
        {t.headingBefore}<span className="text-[#c9bfe0]">{t.headingHighlight}</span>{t.headingAfter}
      </h1>

      <p className="animate-fade-up relative mb-2 max-w-[480px] text-center text-[clamp(14px,2vw,16px)] leading-[1.6] text-white/80 [animation-delay:300ms]">{t.body}</p>
      <p className="animate-fade-up relative mb-9 max-w-[480px] text-center text-[clamp(14px,2vw,16px)] leading-[1.6] text-white/80 [animation-delay:400ms]">{t.bodyLast}</p>

      <div className="animate-fade-up relative flex gap-2.5 [animation-delay:550ms]">
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white" />
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white [animation-delay:0.2s]" />
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white [animation-delay:0.4s]" />
      </div>

      <footer className="animate-fade-up absolute bottom-6 text-center text-[13px] text-white/60 [animation-delay:700ms]">
        {t.urgentPrefix}{' '}
        <a href="mailto:geral@nieusync.com">geral@nieusync.com</a>
      </footer>
    </div>
  );
}
