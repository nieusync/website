import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer, PILLAR_ICONS } from '../components/SiteChrome';

export default function WhatWeDo() {
  const t = useT('site');
  useParallax();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.whatPage.documentTitle;
  }, [t.whatPage.documentTitle]);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div
          data-parallax="0.15"
          className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] rounded-full bg-blue/60 blur-[140px]"
        />
        <div
          data-parallax="0.1"
          className="pointer-events-none absolute -right-40 top-1/2 h-[380px] w-[380px] rounded-full bg-purple/25 blur-[140px]"
        />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.whatPage.label}
          </span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">
            {t.whatPage.title}
          </h1>
          <p className="animate-fade-up text-[18px] leading-[1.8] text-white/85 [animation-delay:200ms]">
            {t.whatPage.subtitle}
          </p>
        </div>
      </section>

      {/* ── PILLARS, IN FULL ── */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {t.pillars.items.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Link
                  key={p.slug}
                  to={`/demo/pillars/${p.slug}`}
                  className="animate-on-scroll group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-purple/40"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-purple/40 bg-purple/10">
                      <Icon size={26} weight="duotone" className="text-purple" />
                    </div>
                    <div>
                      <span className="font-display text-xs tracking-[0.15em] text-purple/70">
                        0{i + 1} / 05
                      </span>
                      <h2 className="font-display text-[28px] leading-none text-white">{p.name}</h2>
                    </div>
                  </div>

                  <p className="mb-7 text-[15px] leading-[1.75] text-white/85">{p.intro}</p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {p.services.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle
                          size={18}
                          weight="duotone"
                          className="mt-0.5 shrink-0 text-purple"
                        />
                        <span className="text-[14px] leading-[1.6] text-white/85">{s}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-2 self-start text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors group-hover:text-purple">
                    {p.name}
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── METHOD ── */}
      <section className="py-20">
        <div className="container">
          <div className="animate-on-scroll mb-12 max-w-[640px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.approach.label}
            </span>
            <h2 className="font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
              {t.approach.title}
            </h2>
          </div>

          <div className="animate-on-scroll grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.approach.steps.map((s, i) => (
              <div
                key={s.title}
                className="stagger-child relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 pt-24 transition-colors duration-300 hover:border-purple/40"
              >
                <span className="pointer-events-none absolute -top-7 right-3 font-display text-[120px] leading-none text-white/[0.05]">
                  0{i + 1}
                </span>
                <h3 className="mb-3 font-display text-2xl text-white">{s.title}</h3>
                <p className="text-[15px] leading-[1.7] text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-32 pt-8">
        <div className="container">
          <div className="animate-on-scroll relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-8 py-14 text-center md:px-16">
            <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
            <div className="relative">
              <h2 className="mb-8 font-display text-[clamp(26px,3.5vw,40px)] leading-[1.1] text-white">
                {t.whatPage.ctaTitle}
              </h2>
              <Link
                to="/demo/contact"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)]"
              >
                {t.whatPage.cta}
                <ArrowRight
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
