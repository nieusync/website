import { useEffect } from 'react';
import L from '../components/L';
// react-router-dom no longer needed here
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer, PILLAR_ICONS, PILLAR_LIVE } from '../components/SiteChrome';

// The full list lives on each pillar page; the card is a teaser
const SERVICES_SHOWN = 3;

export default function WhatWeDo() {
  const t = useT('site');
  useParallax();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.whatPage.documentTitle;
  }, [t.whatPage.documentTitle]);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative pb-20 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div
          data-parallax="0.15"
          className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] glow glow-blue"
        />
        <div
          data-parallax="0.1"
          className="pointer-events-none absolute -right-40 top-1/2 h-[380px] w-[380px] glow glow-purple"
        />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.whatPage.label}
          </span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">
            {t.whatPage.title}
          </h1>
        </div>
      </section>

      {/* ── PILLARS, IN FULL ── */}
      <section className="pb-32 pt-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {t.pillars.items.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <L
                  key={p.slug}
                  to="pillars" param={p.slug}
                  // ponytail: five pillars means the last card is always alone on its row
                  className={`animate-on-scroll group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-purple/40 ${
                    i === t.pillars.items.length - 1
                      ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-12px)]'
                      : ''
                  }`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-purple/40 bg-purple/10">
                      <Icon size={26} weight="duotone" className="text-purple" />
                    </div>
                    <div>
                      <span className="font-display text-xs tracking-[0.15em] text-purple/70">
                        0{i + 1} / 05
                      </span>
                      <h2 className="flex flex-wrap items-center gap-3 font-display text-[28px] leading-none text-white">
                        {p.name}
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                            PILLAR_LIVE[i]
                              ? 'bg-purple/20 text-purple'
                              : 'border border-white/20 text-white/70'
                          }`}
                        >
                          {PILLAR_LIVE[i] ? t.pillars.statusLive : t.pillars.statusSoon}
                        </span>
                      </h2>
                    </div>
                  </div>

                  <p className="mb-7 text-[15px] leading-[1.75] text-white/85">{p.intro}</p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {p.services.slice(0, SERVICES_SHOWN).map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle
                          size={18}
                          weight="duotone"
                          className="mt-0.5 shrink-0 text-purple"
                        />
                        <span className="text-[14px] leading-[1.6] text-white/85">{s}</span>
                      </li>
                    ))}
                    {p.services.length > SERVICES_SHOWN && (
                      <li className="pl-[30px] text-[14px] leading-[1.6] text-white/70">
                        {t.pillars.more(p.services.length - SERVICES_SHOWN)}
                      </li>
                    )}
                  </ul>

                  <span className="inline-flex items-center gap-2 self-start text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors group-hover:text-purple">
                    {p.name}
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </L>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
