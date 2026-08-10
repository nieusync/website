import {
  Bell,
  Buildings,
  ChartLineUp,
  FileText,
  MagnifyingGlass,
  Receipt,
  Tray,
  UsersThree,
} from '@phosphor-icons/react';
import { useT } from '../i18n';

// ponytail: a mock, not a screenshot. The real client area does not exist yet.
// Rendering it as markup keeps it translated, crisp on any display and free of
// an image asset to maintain. Replace with a real capture once the app ships.

const NAV_ICONS = [ChartLineUp, FileText, Tray, Receipt, UsersThree];

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
            app.nieusync.com
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

            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
              {s.workspace}
            </p>
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
              <Buildings size={15} weight="duotone" className="shrink-0 text-purple" />
              <span className="truncate text-[11px] text-white/90">{s.company}</span>
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
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg text-white md:text-2xl">{s.greeting}</p>
                <p className="mt-1 text-[12px] text-white/75">{s.subgreeting}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/75">
                  <MagnifyingGlass size={14} />
                </span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/75">
                  <Bell size={14} />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-purple" />
                </span>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              {s.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <p className="font-display text-xl text-white md:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                  {s.progressTitle}
                </p>
                {s.progress.map((p) => (
                  <div key={p.name} className="mb-3 last:mb-0">
                    <div className="mb-1.5 flex justify-between text-[11px]">
                      <span className="text-white/85">{p.name}</span>
                      <span className="text-white/70">{p.value}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      {/* ponytail: width comes from the data, so it stays inline */}
                      <div
                        className="h-full rounded-full bg-grad-main"
                        style={{ width: `${p.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                  {s.activityTitle}
                </p>
                {s.activity.map((a) => (
                  <div key={a.title} className="mb-4 flex gap-3 last:mb-0">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                    <div>
                      <p className="text-[12px] leading-[1.4] text-white/90">{a.title}</p>
                      <p className="mt-0.5 text-[10px] text-white/70">{a.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </figure>
  );
}
