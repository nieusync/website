import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Info } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer } from '../components/SiteChrome';

export default function LegalIndex() {
  const t = useT('legal');
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.indexDocumentTitle;
  }, [t.indexDocumentTitle]);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      <section className="relative pb-16 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-40 -top-20 h-[380px] w-[380px] glow glow-purple" />

        <div className="container relative max-w-[780px]">
          <Link
            to="/demo"
            className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-purple"
          >
            <ArrowLeft size={14} weight="bold" />
            {t.indexBack}
          </Link>

          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.indexTitle}
          </span>
          <h1 className="mb-6 text-[clamp(34px,5.5vw,64px)] leading-[1.05]">{t.indexHeading}</h1>
          <p className="mb-4 text-[17px] leading-[1.75] text-white/90">{t.indexSubtitle}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-white/85">
            {t.updatedLabel}: {t.updated}
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container">
          <div className="animate-on-scroll mx-auto mb-10 flex max-w-[780px] gap-3 rounded-2xl border border-purple/25 bg-purple/[0.07] px-5 py-4">
            <Info size={18} weight="duotone" className="mt-0.5 shrink-0 text-purple" />
            <p className="text-sm leading-[1.6] text-white/90">{t.indexDisclaimer}</p>
          </div>

          <div className="animate-on-scroll mx-auto grid max-w-[780px] grid-cols-1 gap-5 md:grid-cols-2">
            {t.docs.map((d, i) => (
              <Link
                key={d.slug}
                to={`/demo/legal/${d.slug}`}
                className="stagger-child group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple/40"
              >
                <span className="mb-4 font-display text-sm tracking-[0.15em] text-purple/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mb-3 font-display text-xl leading-[1.25] text-white">{d.title}</h2>
                <p className="mb-6 flex-1 text-[14px] leading-[1.7] text-white/90">{d.summary}</p>
                <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors group-hover:text-purple">
                  {t.read}
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
