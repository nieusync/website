import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Info } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { Nav, Footer } from '../components/SiteChrome';

const sectionId = (i: number) => `sec-${i + 1}`;

export default function Legal() {
  const { slug } = useParams();
  const t = useT('legal');
  const doc = t.docs.find((d) => d.slug === slug) ?? null;
  const [active, setActive] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActive(0);
  }, [slug]);

  // The last section whose heading has passed the sticky nav is the active one
  useEffect(() => {
    if (!doc) return;
    const onScroll = () => {
      const tops = doc.sections.map(
        (_, i) => document.getElementById(sectionId(i))?.getBoundingClientRect().top ?? Infinity,
      );
      const passed = tops.filter((top) => top < 140).length;
      setActive(Math.max(0, passed - 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [doc]);

  useEffect(() => {
    if (doc) document.title = `${doc.title} | Nieusync`;
  }, [doc]);

  if (!doc) return <Navigate to="/demo" replace />;

  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />

      <section className="relative overflow-hidden pb-16 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-40 -top-20 h-[380px] w-[380px] rounded-full bg-purple/20 blur-[140px]" />

        <div className="container relative max-w-[780px]">
          <Link
            to="/demo/legal"
            className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-purple"
          >
            <ArrowLeft size={14} weight="bold" />
            {t.back}
          </Link>

          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.indexTitle}
          </span>
          <h1 className="mb-6 text-[clamp(34px,5.5vw,64px)] leading-[1.05]">{doc.title}</h1>
          <p className="mb-4 text-[17px] leading-[1.75] text-white/55">{doc.summary}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-white/30">
            {t.updatedLabel}: {t.updated}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,780px)]">
          {/* Sticky via CSS; the scroll listener only drives the active highlight */}
          <nav className="hidden self-start lg:block lg:sticky lg:top-28">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              {t.contents}
            </p>
            {doc.sections.map((s, i) => (
              <a
                key={s.title}
                href={`#${sectionId(i)}`}
                className={`block border-l py-2 pl-4 text-[13px] leading-[1.5] transition-colors ${
                  active === i
                    ? 'border-purple text-white'
                    : 'border-white/10 text-white/40 hover:text-white/70'
                }`}
              >
                <span className="mr-2 text-purple/60">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </a>
            ))}
          </nav>

          <div>
            <div className="mb-12 flex gap-3 rounded-2xl border border-purple/25 bg-purple/[0.07] px-5 py-4">
              <Info size={18} weight="duotone" className="mt-0.5 shrink-0 text-purple" />
              <p className="text-sm leading-[1.6] text-white/55">{t.disclaimer}</p>
            </div>

            {doc.sections.map((s, i) => (
              <article
                key={s.title}
                id={sectionId(i)}
                className="mb-10 scroll-mt-28 border-t border-white/10 pt-8"
              >
                <h2 className="mb-5 font-display text-[26px] leading-[1.2] text-white">
                  <span className="mr-3 text-purple/60">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mb-4 text-[15px] leading-[1.85] text-white/55">
                    {p}
                  </p>
                ))}
              </article>
            ))}

            <div className="border-t border-white/10 pt-8">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
                {t.indexTitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.docs
                  .filter((d) => d.slug !== doc.slug)
                  .map((d) => (
                    <Link
                      key={d.slug}
                      to={`/demo/legal/${d.slug}`}
                      className="rounded-full border border-white/15 px-5 py-2.5 text-[12px] text-white/60 transition-colors hover:border-purple hover:text-purple"
                    >
                      {d.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
