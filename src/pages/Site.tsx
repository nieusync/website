import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, LockKey } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useArticles, BLOG_URL } from '../hooks/useArticles';
import { Nav, Footer, PLATFORM_URL, PILLAR_ICONS } from '../components/SiteChrome';

function Orbit() {
  const t = useT('site');

  return (
    <div aria-hidden="true" className="relative hidden h-[460px] w-[460px] shrink-0 lg:block">
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-14 rounded-full border border-white/[0.09]" />
      <div className="absolute inset-28 rounded-full border border-purple/20" />

      {/* Symbol only — the wordmark would not read at this size inside the rings.
          Centring lives on the wrapper: animate-pulse-soft sets `transform`, which
          would otherwise replace the -translate-x/y that centres the image. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img src="/assets/logo_s_w_nbg.png" alt="" className="w-24 animate-pulse-soft" />
      </div>

      {/* The layer spins; each node counter-spins so its icon stays upright */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:60s]">
        {t.pillars.items.map((p, i) => {
          const Icon = PILLAR_ICONS[i];
          const angle = ((i * 72 - 90) * Math.PI) / 180;
          return (
            <div
              key={p.slug}
              className="absolute left-1/2 top-1/2"
              // ponytail: node position is computed from the pillar angle — stays inline
              style={{
                transform: `translate(calc(-50% + ${(Math.cos(angle) * 230).toFixed(1)}px), calc(-50% + ${(Math.sin(angle) * 230).toFixed(1)}px))`,
              }}
            >
              <div className="flex h-14 w-14 animate-spin-slow items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_0_24px_rgba(159,142,194,0.2)] backdrop-blur-sm [animation-direction:reverse] [animation-duration:60s]">
                <Icon size={24} weight="duotone" className="text-purple" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Marquee() {
  const t = useT('site');
  const row = Array(3).fill(t.pillars.items).flat() as { name: string }[];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((p, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-8 pr-8 font-display text-xl uppercase tracking-[0.25em] text-white/20"
              >
                {p.name}
                <span className="text-sm text-purple/60">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogSection() {
  const t = useT('site');
  const { articles, loading } = useArticles(3);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(t.blog.dateLocale, { month: 'short', year: 'numeric' });
  };

  return (
    <section id="blog" className="relative overflow-hidden py-32">
      <div data-parallax="0.12" className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full bg-purple/20 blur-[140px]" />

      <div className="container relative">
        <div className="animate-on-scroll mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.blog.label}
            </span>
            <h2 className="mb-5 font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
              {t.blog.title}
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/50">{t.blog.subtitle}</p>
          </div>
          <a
            href={BLOG_URL}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-purple hover:text-purple"
          >
            {t.blog.cta}
            <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Cards mount after the Ghost fetch resolves, so they use a mount-time
            animation — the scroll-reveal observer only sees elements present at load */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((a, i) => (
              <a
                key={a.id}
                href={a.url}
                // ponytail: stagger delay depends on the index — stays inline
                style={{ animationDelay: `${i * 120}ms` }}
                className="animate-fade-up group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-purple/40"
              >
                {a.image && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {a.category && (
                    <span className="mb-3 self-start rounded-full bg-purple/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-purple">
                      {a.category}
                    </span>
                  )}
                  <h3 className="mb-3 text-[17px] font-bold leading-[1.4] text-white">{a.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-[1.6] text-white/45">{a.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-white/35">
                      {a.readTime} {t.blog.minutesSuffix} · {formatDate(a.publishedAt)}
                    </span>
                    <span className="text-[13px] font-bold text-purple">{t.blog.readArticle}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Site() {
  const t = useT('site');
  const { hash } = useLocation();
  useParallax();
  useScrollReveal();

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue/70 blur-[150px]" />
        <div data-parallax="0.25" className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-purple/30 blur-[140px]" />

        <div className="container relative flex items-center justify-between gap-12">
          <div className="max-w-[640px]">
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="animate-fade-up mb-8 text-[clamp(44px,7.5vw,96px)] leading-[1.02] [animation-delay:100ms]">
              {t.hero.titleTop}
              <br />
              <span className="animate-gradient bg-gradient-to-r from-purple via-white to-purple bg-[length:200%_auto] bg-clip-text text-transparent">
                {t.hero.titleSync}
              </span>
            </h1>

            <p className="animate-fade-up mb-10 max-w-[480px] text-[17px] leading-[1.7] text-white/60 [animation-delay:200ms]">
              {t.hero.subtitle}
            </p>

            <div className="animate-fade-up flex flex-wrap items-center gap-4 [animation-delay:300ms]">
              <a
                href="/demo#pillars"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-blue transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
              >
                {t.hero.ctaPillars}
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </div>

          <Orbit />
        </div>

        {/* Scroll cue */}
        <div aria-hidden="true" className="animate-fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 [animation-delay:800ms] md:block">
          <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/25 p-1.5">
            <span className="h-2 w-[3px] animate-float rounded-full bg-white/60 [animation-duration:2s]" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── WHO WE ARE ── */}
      <section id="who" className="relative overflow-hidden py-32">
        <div data-parallax="0.15" className="pointer-events-none absolute -right-40 top-1/4 h-[380px] w-[380px] rounded-full bg-blue/60 blur-[140px]" />
        <div className="container relative">
          <div className="animate-on-scroll mx-auto max-w-[780px] text-center">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.who.label}
            </span>
            <h2 className="mb-8 font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
              {t.who.title}
            </h2>
            <p className="text-[18px] leading-[1.8] text-white/55">{t.who.text}</p>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="pillars" className="relative overflow-hidden py-32">
        <div data-parallax="0.12" className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-purple/20 blur-[140px]" />

        <div className="container relative">
          <div className="animate-on-scroll mb-16 max-w-[640px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.pillars.label}
            </span>
            <h2 className="mb-5 font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
              {t.pillars.title}
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/50">{t.pillars.subtitle}</p>
          </div>

          <div className="animate-on-scroll border-t border-white/10">
            {t.pillars.items.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Link
                  key={p.slug}
                  to={`/demo/pillars/${p.slug}`}
                  className="stagger-child group grid grid-cols-[48px_1fr] items-center gap-x-5 gap-y-3 border-b border-white/10 px-2 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[72px_64px_1fr_1.1fr_48px] md:gap-8 md:px-6 md:py-10"
                >
                  <span className="hidden font-display text-sm tracking-[0.1em] text-purple/70 md:block">
                    0{i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-purple/50 md:h-14 md:w-14">
                    <Icon size={26} weight="duotone" className="text-purple" />
                  </div>
                  <h3 className="font-display text-[clamp(26px,3.5vw,44px)] leading-none text-white transition-transform duration-300 group-hover:translate-x-2">
                    {p.name}
                  </h3>
                  <p className="col-span-2 text-[15px] leading-[1.7] text-white/45 md:col-span-1">
                    {p.desc}
                  </p>
                  <ArrowUpRight
                    size={28}
                    weight="bold"
                    className="hidden -translate-x-2 text-purple opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach" className="relative overflow-hidden py-32">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-blue/60 blur-[140px]" />

        <div className="container relative">
          <div className="animate-on-scroll mb-16 max-w-[640px]">
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
                <p className="text-[15px] leading-[1.7] text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <BlogSection />

      {/* ── CLIENT AREA ── */}
      <section className="py-32">
        <div className="container">
          <div className="animate-on-scroll relative mx-auto max-w-3xl rounded-[28px] bg-grad-main p-px shadow-[0_0_90px_rgba(159,142,194,0.25)]">
            <div className="relative overflow-hidden rounded-[27px] bg-ink px-8 py-16 text-center md:px-16">
              <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
              <div className="relative">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple/40 bg-purple/10 shadow-[0_0_40px_rgba(159,142,194,0.35)]">
                  <LockKey size={30} weight="duotone" className="text-purple" />
                </div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
                  {t.portal.label}
                </span>
                <h2 className="mb-5 font-display text-[clamp(30px,4.5vw,52px)] leading-[1.05] text-white">
                  {t.portal.title}
                </h2>
                <p className="mx-auto mb-10 max-w-[440px] text-[16px] leading-[1.7] text-white/55">
                  {t.portal.desc}
                </p>
                <a
                  href={PLATFORM_URL}
                  className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)]"
                >
                  {t.portal.cta}
                  <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <p className="mt-6 text-xs text-white/35">{t.portal.hint}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
