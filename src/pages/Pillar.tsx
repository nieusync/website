import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer, PLATFORM_URL, PILLAR_ICONS } from '../components/SiteChrome';

export default function Pillar() {
  const { slug } = useParams();
  const t = useT('site');
  useParallax();
  useScrollReveal();

  const idx = t.pillars.items.findIndex((p) => p.slug === slug);
  const pillar = idx >= 0 ? t.pillars.items[idx] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (pillar) document.title = `${pillar.name} — NIEUSYNC`;
  }, [pillar]);

  if (!pillar) return <Navigate to="/demo" replace />;
  const Icon = PILLAR_ICONS[idx];

  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -right-40 -top-20 h-[420px] w-[420px] rounded-full bg-purple/25 blur-[140px]" />
        <div data-parallax="0.1" className="pointer-events-none absolute -left-40 top-1/2 h-[380px] w-[380px] rounded-full bg-blue/60 blur-[140px]" />

        <div className="container relative">
          <Link
            to="/demo#pillars"
            className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-purple"
          >
            <ArrowLeft size={14} weight="bold" />
            {t.pillarPage.back}
          </Link>

          <div className="animate-fade-up mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple/40 bg-purple/10 shadow-[0_0_40px_rgba(159,142,194,0.3)]">
              <Icon size={32} weight="duotone" className="text-purple" />
            </div>
            <span className="font-display text-sm tracking-[0.15em] text-purple/70">
              0{idx + 1} / 05
            </span>
          </div>

          <h1 className="animate-fade-up mb-8 text-[clamp(48px,8vw,104px)] leading-[1.0] [animation-delay:100ms]">
            {pillar.name}
            <span className="text-purple">.</span>
          </h1>

          <p className="animate-fade-up max-w-[560px] text-[18px] leading-[1.75] text-white/60 [animation-delay:200ms]">
            {pillar.intro}
          </p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20">
        <div className="container">
          <div className="animate-on-scroll mb-10">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.pillarPage.servicesLabel}
            </span>
          </div>

          <div className="animate-on-scroll grid grid-cols-1 gap-5 md:grid-cols-2">
            {pillar.services.map((s) => (
              <div
                key={s}
                className="stagger-child flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-colors duration-300 hover:border-purple/40"
              >
                <CheckCircle size={22} weight="duotone" className="shrink-0 text-purple" />
                <span className="text-[15px] leading-[1.6] text-white/75">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-32 pt-12">
        <div className="container">
          <div className="animate-on-scroll relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-8 py-14 text-center md:px-16">
            <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
            <div className="relative">
              <h2 className="mb-8 font-display text-[clamp(26px,3.5vw,40px)] leading-[1.1] text-white">
                {t.pillarPage.ctaTitle}
              </h2>
              <a
                href={PLATFORM_URL}
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)]"
              >
                {t.pillarPage.cta}
                <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
