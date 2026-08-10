import { useEffect } from 'react';
import { EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react';
import { useT } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Nav, Footer } from '../components/SiteChrome';
import { ContactForm, CONTACT_EMAIL } from '../components/Forms';

const DETAILS = [
  { Icon: EnvelopeSimple, label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { Icon: Phone, label: '(+351) 269 030 096', href: 'tel:+351269030096' },
  { Icon: MapPin, label: 'Portugal', href: null },
];

export default function Contact() {
  const t = useT('site');
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = t.contact.documentTitle;
  }, [t.contact.documentTitle]);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />

      <section className="relative overflow-hidden pb-24 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-blue/60 blur-[150px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-purple/25 blur-[140px]" />

        <div className="container relative grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="animate-fade-up">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
              {t.contact.label}
            </span>
            <h1 className="mb-6 text-[clamp(38px,6vw,76px)] leading-[1.03]">{t.contact.title}</h1>
            <p className="mb-10 text-[17px] leading-[1.75] text-white/85">{t.contact.subtitle}</p>

            <div className="border-t border-white/10 pt-8">
              {DETAILS.map(({ Icon, label, href }) => {
                const body = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-purple">
                      <Icon size={17} weight="duotone" />
                    </span>
                    {label}
                  </>
                );
                const cls = 'mb-4 flex items-center gap-4 text-[15px] text-white/85';
                return href ? (
                  <a key={label} href={href} className={`${cls} transition-colors hover:text-purple`}>
                    {body}
                  </a>
                ) : (
                  <p key={label} className={cls}>
                    {body}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
