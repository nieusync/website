import { useEffect } from 'react'
import { Nav, Footer } from '../components/SiteChrome'
import L from '../components/L'
import { useParallax } from '../hooks/useParallax'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useT } from '../i18n'

type Props = { kind: 'legal' | 'compliance' }

export default function ServicePricing({ kind }: Props) {
  const t = useT('services')
  const page = t[kind]
  useParallax()
  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = page.documentTitle
  }, [page.documentTitle])

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Nav />

      <section className="relative pb-16 pt-40">
        <div className="tech-grid-white pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div data-parallax="0.15" className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] glow glow-blue" />
        <div data-parallax="0.1" className="pointer-events-none absolute -right-40 top-1/2 h-[380px] w-[380px] glow glow-purple" />

        <div className="container relative max-w-[820px]">
          <span className="animate-fade-up mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-purple">{page.label}</span>
          <h1 className="animate-fade-up mb-8 text-[clamp(40px,6.5vw,84px)] leading-[1.02] [animation-delay:100ms]">{page.title}</h1>
          <p className="animate-fade-up max-w-xl text-[17px] leading-[1.75] text-white/85 [animation-delay:200ms]">{page.subtitle}</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container">
          <div className="animate-on-scroll overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <caption className="sr-only">{page.caption}</caption>
              <thead className="border-b-2 border-purple/60 bg-white/[0.04]">
                <tr>
                  {page.headers.map((header, index) => (
                    <th
                      key={header}
                      scope="col"
                      className={`px-5 py-5 font-display text-lg text-white ${index === 0 ? 'w-[36%]' : 'w-[21.33%] text-center'}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {page.rows.map((row) => (
                  <tr key={row.label} className="align-top">
                    <th scope="row" className="px-5 py-4 text-sm font-bold leading-6 text-white/90">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${page.headers[index + 1]}`} className="px-5 py-4 text-center text-sm leading-6 text-white/75">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <L to="contact" className="btn-gradient px-8 py-3.5">
              {page.cta}
            </L>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
