import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  Package,
  Path,
  Question,
  XLogo,
} from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer } from '../components/SiteChrome';

// Golden circle, outside in on the page but why-first in the copy
const GOLDEN_ICONS = [Question, Path, Package];

// Both arrays follow the order of the i18n `whoPage.team` array
const TEAM_PHOTOS = [
  '/assets/ricardo_serrao_carvalho.jpeg',
  '/assets/joao_carvalho.jpeg',
  '/assets/ricardo_carvalho.jpeg',
];

const TEAM_SOCIALS = [
  [
    { href: 'https://www.linkedin.com/in/ricardo-serrao-de-carvalho/', Icon: LinkedinLogo, label: 'LinkedIn' },
    { href: 'https://x.com/RicardoSCarva', Icon: XLogo, label: 'X' },
  ],
  [
    { href: 'https://www.linkedin.com/in/d-roak/', Icon: LinkedinLogo, label: 'LinkedIn' },
    { href: 'https://x.com/droak_', Icon: XLogo, label: 'X' },
    { href: 'https://github.com/d-roak', Icon: GithubLogo, label: 'GitHub' },
  ],
  [
    { href: 'https://www.linkedin.com/in/ricardo-m-carvalho/', Icon: LinkedinLogo, label: 'LinkedIn' },
    { href: 'https://x.com/ricardomlc93', Icon: XLogo, label: 'X' },
  ],
];

export default function WhoWeAre() {
  const t = useT('site');
  useParallax();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.whoPage.documentTitle;
  }, [t.whoPage.documentTitle]);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative pb-20 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div
          data-parallax="0.15"
          className="pointer-events-none absolute -right-40 -top-20 h-[420px] w-[420px] glow glow-purple"
        />
        <div
          data-parallax="0.1"
          className="pointer-events-none absolute -left-40 top-1/2 h-[380px] w-[380px] glow glow-blue"
        />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.whoPage.label}
          </span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">
            {t.whoPage.title}
          </h1>
          <p className="animate-fade-up text-[18px] leading-[1.8] text-white/85 [animation-delay:200ms]">
            {t.whoPage.subtitle}
          </p>
        </div>
      </section>

      {/* ── GOLDEN CIRCLE ── */}
      <section className="py-20">
        <div className="container">
          <div className="animate-on-scroll grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.whoPage.golden.map((g, i) => {
              const Icon = GOLDEN_ICONS[i];
              return (
                <article
                  key={g.key}
                  className="stagger-child relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-purple/40"
                >
                  {/* Concentric rings: the golden circle, one ring tighter per card */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/[0.07]"
                  >
                    <div className="absolute inset-6 rounded-full border border-white/[0.07]" />
                    <div className="absolute inset-12 rounded-full border border-purple/25" />
                  </div>

                  <div className="relative">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-purple/40 bg-purple/10">
                      <Icon size={24} weight="duotone" className="text-purple" />
                    </div>
                    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
                      {g.key}
                    </span>
                    <h2 className="mb-4 font-display text-2xl leading-[1.2] text-white">
                      {g.title}
                    </h2>
                    <p className="text-[15px] leading-[1.75] text-white/80">{g.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="relative py-24">
        <div
          data-parallax="0.12"
          className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] glow glow-purple"
        />

        <div className="container relative">
          <div className="animate-on-scroll mb-14 max-w-[640px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.whoPage.teamLabel}
            </span>
            <h2 className="mb-5 font-display text-[clamp(34px,5vw,60px)] leading-[1.05] text-white">
              {t.whoPage.teamTitle}
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/80">{t.whoPage.teamSubtitle}</p>
          </div>

          <div className="animate-on-scroll grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.whoPage.team.map((m, i) => (
              <article
                key={m.name}
                className="stagger-child flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-purple/40"
              >
                <img
                  src={TEAM_PHOTOS[i]}
                  alt={m.name}
                  loading="lazy"
                  className="mx-auto mb-7 h-40 w-40 rounded-full object-cover ring-1 ring-white/15"
                />
                <h3 className="mb-1 text-center font-display text-xl leading-[1.2] text-white">
                  {m.name}
                </h3>
                <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.1em] text-purple">
                  {m.role}
                </p>
                <p className="mb-5 text-center text-[12px] uppercase tracking-[0.1em] text-white/70">
                  {m.pillars}
                </p>
                <p className="mb-7 flex-1 text-[15px] leading-[1.7] text-white/80">{m.bio}</p>

                <div className="flex justify-center gap-4">
                  {TEAM_SOCIALS[i].map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on ${label}`}
                      className="text-white/75 transition-colors hover:text-purple"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </article>
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
                {t.whoPage.ctaTitle}
              </h2>
              <Link
                to="/demo/contact"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-grad-main px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(159,142,194,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(159,142,194,0.6)]"
              >
                {t.whoPage.cta}
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
