import {
  Buildings,
  CaretUpDown,
  ChartLineUp,
  FileText,
  Tray,
  UsersThree,
} from '@phosphor-icons/react';
import { useT } from '../i18n';

// ponytail: a mock, not a screenshot. Rendering it as markup keeps it
// translated, crisp on any display and free of an image asset to re-shoot on
// every redesign, and no client's data ever leaves the portal to sit on a
// marketing page. It does have to stay honest: it mirrors the portal's own
// Overview, so when that page changes, change this with it.

const NAV_ICONS = [ChartLineUp, FileText, Tray, UsersThree];

export function ClientAreaShot() {
  const t = useT('site');
  const s = t.portal.shot;

  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0B1024] shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-white/70">
            portal.nieusync.com
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-white/10 bg-white/[0.02] p-4 sm:block">
            <div className="mb-6 flex items-center gap-2">
              <img src="/assets/logo_s_w_nbg.png" alt="" className="h-6 w-auto" loading="lazy" />
              <span className="font-display text-[13px] tracking-[0.08em] text-white/90">
                Nieusync
              </span>
            </div>

            {/* The workspace switcher: one login can be a client at several
                companies, so the portal names the one being read. */}
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
              <Buildings size={15} weight="duotone" className="shrink-0 text-purple" />
              <span className="flex-1 truncate text-[11px] text-white/90">{s.company}</span>
              <CaretUpDown size={12} className="shrink-0 text-white/50" />
            </div>

            {s.nav.map((item, i) => {
              const Icon = NAV_ICONS[i];
              const active = i === 0;
              return (
                <div
                  key={item}
                  className={`mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] ${
                    active ? 'bg-purple/15 text-white' : 'text-white/80'
                  }`}
                >
                  <Icon size={15} weight={active ? 'fill' : 'regular'} />
                  {item}
                </div>
              );
            })}
          </aside>

          {/* Main panel */}
          <div className="p-5 md:p-7">
            <div className="mb-6">
              <p className="font-display text-lg text-white md:text-2xl">{s.greeting}</p>
              <p className="mt-1 text-[12px] text-white/75">{s.company}</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              {s.stats.map((stat, i) => {
                const Icon = i === 0 ? Tray : FileText;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                  >
                    <Icon size={16} weight="duotone" className="mb-2 text-purple" />
                    <p className="font-display text-xl text-white md:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/70">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { title: s.requestsTitle, rows: s.requests },
                { title: s.documentsTitle, rows: s.documents },
              ].map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                    {panel.title}
                  </p>
                  {panel.rows.map((row) => (
                    <div key={row.title} className="mb-3.5 flex gap-3 last:mb-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                      <div className="min-w-0">
                        {/* Wraps rather than truncating: the real panel is
                            wider than this illustration, and an ellipsis in
                            every row reads as a bug. */}
                        <p className="text-[12px] leading-[1.4] text-white/90">{row.title}</p>
                        <p className="mt-0.5 text-[10px] text-white/70">{row.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
