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
  List,
  LinkedinLogo,
  LockKey,
  Scales,
  X,
} from '@phosphor-icons/react';
import { useT, useLang, type Lang } from '../i18n';
import { BLOG_URL } from '../hooks/useArticles';

// ponytail: the real client area is the "platform" app on its own domain, and it
// is not live yet, so every entry point goes to the mock sign-in page for now.
// Point CLIENT_AREA_PATH at VITE_PLATFORM_URL once that app ships.
export const CLIENT_AREA_PATH = '/demo/client-area';

// One icon per pillar, same order as the i18n `pillars.items` array
export const PILLAR_ICONS = [Scales, Cpu, Compass, Gear, Calculator];

const CONTACTS = [
  { label: '(+351) 269 030 096', href: 'tel:+351269030096' },
  { label: 'geral@nieusync.com', href: 'mailto:geral@nieusync.com' },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/nieusync/', Icon: LinkedinLogo, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/nieusync/', Icon: InstagramLogo, label: 'Instagram' },
  { href: 'https://www.facebook.com/nieusync', Icon: FacebookLogo, label: 'Facebook' },
];

const LANGS: Lang[] = ['pt', 'en'];

function LangSwitch() {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="PT / EN"
        aria-expanded={open}
        className="flex min-h-[40px] cursor-pointer items-center gap-2 border-none bg-transparent px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
      >
        <Globe size={17} />
        {lang.toUpperCase()}
        <CaretDown
          size={11}
          weight="bold"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-28 rounded-xl border border-white/10 bg-ink/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border-none bg-transparent px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/[0.06]"
            >
              {l.toUpperCase()}
              {lang === l && <Check size={14} weight="bold" className="text-purple" />}
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile panel covers the page, so the page behind it must not scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = 'text-sm font-bold text-white/60 transition-colors hover:text-white';

  const links = (
    <>
      <Link to="/demo/who-we-are" className={linkCls} onClick={() => setOpen(false)}>
        {t.nav.whoWeAre}
      </Link>
      <Link to="/demo/what-we-do" className={linkCls} onClick={() => setOpen(false)}>
        {t.nav.whatWeDo}
      </Link>
      <a href={BLOG_URL} className={linkCls}>
        {t.nav.whatWeThink}
      </a>
    </>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/demo" className="shrink-0" onClick={() => setOpen(false)}>
          <img src="/assets/logo_h_w_nbg.png" alt="Nieusync" className="h-7 w-auto md:h-9" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">{links}</nav>

        <div className="flex items-center gap-1 md:gap-4">
          <LangSwitch />

          <Link
            to={CLIENT_AREA_PATH}
            className="group hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-purple hover:text-purple sm:inline-flex md:px-5"
          >
            <LockKey size={15} weight="bold" />
            {t.nav.clientArea}
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border-none bg-transparent text-white lg:hidden"
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-ink/95 px-6 pb-8 pt-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-5 py-4 text-lg [&>*]:text-lg">{links}</div>
          <Link
            to={CLIENT_AREA_PATH}
            onClick={() => setOpen(false)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
          >
            <LockKey size={15} weight="bold" />
            {t.nav.clientArea}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const t = useT('site');
  const legal = useT('legal');
  const year = new Date().getFullYear();

  const colTitle = 'mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35';
  const colLink = 'block py-1.5 text-sm text-white/55 transition-colors hover:text-purple';

  return (
    <footer className="border-t border-white/10">
      <div className="container grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
        <div>
          <img src="/assets/logo_h_w_nbg.png" alt="Nieusync" className="mb-5 h-9 w-auto" loading="lazy" />
          <p className="mb-6 max-w-[300px] text-sm leading-[1.7] text-white/45">{t.footer.description}</p>
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
          <Link to="/demo/who-we-are" className={colLink}>{t.nav.whoWeAre}</Link>
          <Link to="/demo/what-we-do" className={colLink}>{t.nav.whatWeDo}</Link>
          <a href={BLOG_URL} className={colLink}>{t.footer.blog}</a>
          <Link to={CLIENT_AREA_PATH} className={colLink}>{t.footer.clientArea}</Link>
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
          <p className={colTitle}>{t.footer.legal}</p>
          {legal.docs.map((d) => (
            <Link key={d.slug} to={`/demo/legal/${d.slug}`} className={colLink}>
              {d.title}
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
        <div className="container py-6">
          <p className="text-xs text-white/30">{t.footer.copyright(year)}</p>
        </div>
      </div>
    </footer>
  );
}
