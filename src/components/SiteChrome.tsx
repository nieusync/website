import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Calculator,
  CaretDown,
  Check,
  Compass,
  Cpu,
  FacebookLogo,
  Gear,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  LockKey,
  Scales,
} from '@phosphor-icons/react';
import { useT, useLang, type Lang } from '../i18n';
import { BLOG_URL } from '../hooks/useArticles';

// ponytail: the client area lives in the "platform" app; set VITE_PLATFORM_URL in production
export const PLATFORM_URL = import.meta.env.VITE_PLATFORM_URL ?? 'http://localhost:5174';

// One icon per pillar, same order as the i18n `pillars.items` array
export const PILLAR_ICONS = [Scales, Cpu, Compass, Gear, Calculator];

const REGIONS: { code: Lang; region: string; language: string; short: string }[] = [
  { code: 'en', region: 'Global', language: 'English', short: 'Global — EN' },
  { code: 'pt', region: 'Portugal', language: 'Português', short: 'Portugal — PT' },
];

const CONTACTS = [
  { label: '(+351) 269 030 096', href: 'tel:+351269030096' },
  { label: '(+351) 933 644 596', href: 'tel:+351933644596' },
  { label: 'geral@nieusync.com', href: 'mailto:geral@nieusync.com' },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/nieusync', Icon: LinkedinLogo, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/nieusync', Icon: InstagramLogo, label: 'Instagram' },
  { href: 'https://www.facebook.com/nieusync', Icon: FacebookLogo, label: 'Facebook' },
];

function RegionPicker() {
  const t = useT('site');
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = REGIONS.find((r) => r.code === lang) ?? REGIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.region.select}
        aria-expanded={open}
        className="flex min-h-[40px] cursor-pointer items-center gap-2 border-none bg-transparent px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
      >
        <Globe size={17} />
        <span className="hidden sm:inline">{current.short}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <CaretDown size={11} weight="bold" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-white/10 bg-ink/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
            {t.region.select}
          </p>
          {REGIONS.map((r) => (
            <button
              key={r.code}
              onClick={() => {
                setLang(r.code);
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border-none bg-transparent px-3 py-3 text-left text-sm transition-colors hover:bg-white/[0.06]"
            >
              <span>
                <span className="font-bold text-white">{r.region}</span>
                <span className="text-white/45"> — {r.language}</span>
              </span>
              {lang === r.code && <Check size={16} weight="bold" className="text-purple" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const t = useT('site');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = 'text-sm font-bold text-white/60 transition-colors hover:text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/demo" className="shrink-0">
          <img src="/assets/logo_h_w_nbg.png" alt="NIEUSYNC" className="h-8 w-auto md:h-9" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/demo#who" className={linkCls}>{t.nav.whoWeAre}</Link>
          <Link to="/demo#pillars" className={linkCls}>{t.nav.whatWeDo}</Link>
          <a href={BLOG_URL} className={linkCls}>{t.nav.whatWeThink}</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <RegionPicker />
          <a
            href={PLATFORM_URL}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-purple hover:text-purple md:px-5"
          >
            <LockKey size={15} weight="bold" />
            <span className="hidden sm:inline">{t.nav.clientArea}</span>
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const t = useT('site');
  const year = new Date().getFullYear();

  const colTitle = 'mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35';
  const colLink = 'block py-1.5 text-sm text-white/55 transition-colors hover:text-purple';

  return (
    <footer className="border-t border-white/10">
      <div className="container grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src="/assets/logo_h_w_nbg.png" alt="NIEUSYNC" className="mb-5 h-9 w-auto" loading="lazy" />
          <p className="mb-6 max-w-[260px] text-sm leading-[1.7] text-white/45">{t.footer.tagline}</p>
          <div className="flex gap-4">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/45 transition-colors hover:text-purple"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className={colTitle}>{t.footer.company}</p>
          <Link to="/demo#who" className={colLink}>{t.nav.whoWeAre}</Link>
          <Link to="/demo#pillars" className={colLink}>{t.nav.whatWeDo}</Link>
          <a href={BLOG_URL} className={colLink}>{t.footer.blog}</a>
          <a href={PLATFORM_URL} className={colLink}>{t.footer.clientArea}</a>
        </div>

        <div>
          <p className={colTitle}>{t.footer.pillars}</p>
          {t.pillars.items.map((p) => (
            <Link key={p.slug} to={`/demo/pillars/${p.slug}`} className={colLink}>
              {p.name}
            </Link>
          ))}
        </div>

        <div>
          <p className={colTitle}>{t.footer.contact}</p>
          {CONTACTS.map(({ label, href }) => (
            <a key={label} href={href} className={colLink}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="text-xs text-white/30">{t.footer.copyright(year)}</p>
          <p className="text-xs text-white/30">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
