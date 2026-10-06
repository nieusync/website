import { useEffect } from 'react';
import { ArrowUpRight, Calculator, Scales, ShieldCheck } from '@phosphor-icons/react';
import { Nav, Footer } from '../components/SiteChrome';
import L from '../components/L';
import { useParallax } from '../hooks/useParallax';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useT } from '../i18n';

const ICONS = [Calculator, Scales, ShieldCheck];
const TOOL_ROUTES = ['funding', 'pmeCheck', 'rgpcCheck'] as const;

export default function Tools() {
  const t = useT('tools');
  useParallax();
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
        <div data-parallax="0.15" className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] glow glow-blue" />
        <div data-parallax="0.1" className="pointer-events-none absolute -right-40 top-1/2 h-[380px] w-[380px] glow glow-purple" />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">
            {t.indexLabel}
          </span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">
            {t.indexTitle}
          </h1>
          <p className="animate-fade-up max-w-xl text-[17px] leading-[1.75] text-white/85 [animation-delay:200ms]">
            {t.indexSubtitle}
          </p>
        </div>
      </section>

      {/* The first tool leads. Three equal cards would say all three matter
          equally, and the funding one is the only that ends in a number. */}
      <section className="pb-32">
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.items.map((item, index) => {
            const Icon = ICONS[index];
            const lead = index === 0;
            return (
              <L
                key={item.id}
                to={TOOL_ROUTES[index]!}
                className={`animate-on-scroll group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-purple/40 hover:bg-white/[0.05] ${
                  lead ? 'md:col-span-2 lg:flex-row lg:items-center lg:gap-12 lg:p-10' : ''
                }`}
              >
                <div className={lead ? 'lg:w-[58%]' : ''}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-purple/40 bg-purple/10">
                    <Icon size={26} weight="duotone" className="text-purple" />
                  </div>
                  <h2 className={`font-display leading-none text-white ${lead ? 'text-[clamp(28px,3.4vw,40px)]' : 'text-[26px]'}`}>
                    {item.name}
                  </h2>
                  <p className={`mt-4 leading-[1.7] text-white/75 ${lead ? 'text-base' : 'text-sm'}`}>{item.desc}</p>
                </div>

                <span
                  className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-purple ${
                    lead ? 'mt-8 lg:ml-auto lg:mt-0 lg:shrink-0' : 'mt-auto pt-8'
                  }`}
                >
                  {t.open}
                  <ArrowUpRight size={15} weight="bold" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </L>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
