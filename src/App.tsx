import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { I18nProvider, detect, type Lang } from './i18n';
import { ROUTES, LANGS, href, swapLang, legacyTarget } from './routes';
import { ClientAreaRedirect } from './components/AppLink';

const Site = lazy(() => import('./pages/Site'));
const Pillar = lazy(() => import('./pages/Pillar'));
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'));
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'));
const Legal = lazy(() => import('./pages/Legal'));
const LegalIndex = lazy(() => import('./pages/LegalIndex'));
const Contact = lazy(() => import('./pages/Contact'));

/**
 * Owns the language for everything under it. `lang` comes from which subtree
 * matched, not from state, so the URL is the source of truth and a shared link
 * always reads in the language it was shared in.
 */
function LocaleLayout({ lang }: { lang: Lang }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';

    // hreflang tells search engines these are translations of one another
    // rather than duplicates, and canonical keeps one URL per page. Done here
    // because pages set their own <title> imperatively and there is no head
    // library in this project; the cleanup on unmount is what stops these
    // stacking up as you navigate.
    const tags: Array<{ rel: string; href: string; hreflang?: string }> = [
      { rel: 'canonical', href: `https://nieusync.com${pathname}` },
      ...LANGS.map((l) => ({
        rel: 'alternate',
        href: `https://nieusync.com${swapLang(pathname, l)}`,
        hreflang: l === 'pt' ? 'pt-PT' : 'en',
      })),
      { rel: 'alternate', href: `https://nieusync.com${swapLang(pathname, 'pt')}`, hreflang: 'x-default' },
    ];

    const added = tags.map(({ rel, href: value, hreflang }) => {
      const el = document.createElement('link');
      el.rel = rel;
      el.href = value;
      if (hreflang) el.hreflang = hreflang;
      document.head.appendChild(el);
      return el;
    });
    return () => added.forEach((el) => el.remove());
  }, [lang, pathname]);

  return (
    <I18nProvider lang={lang}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </I18nProvider>
  );
}

/**
 * Anything with no language in the path: `/`, the pre-split `/demo/*` URLs, and
 * genuine typos. Old links land on their translated equivalent rather than
 * being swallowed, which is what the previous catch-all did to every unknown
 * URL including the entire old site.
 */
function Fallback() {
  const { pathname } = useLocation();
  const lang = detect();
  return <Navigate to={legacyTarget(pathname, lang) ?? href(lang, 'home')} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {LANGS.map((lang) => (
          <Route key={lang} path={lang} element={<LocaleLayout lang={lang} />}>
            <Route index element={<Site />} />
            <Route path={ROUTES.whoWeAre[lang]} element={<WhoWeAre />} />
            <Route path={ROUTES.whatWeDo[lang]} element={<WhatWeDo />} />
            <Route path={ROUTES.clientArea[lang]} element={<ClientAreaRedirect />} />
            <Route path={ROUTES.contact[lang]} element={<Contact />} />
            <Route path={ROUTES.legal[lang]} element={<LegalIndex />} />
            <Route path={`${ROUTES.legal[lang]}/:slug`} element={<Legal />} />
            <Route path={`${ROUTES.pillars[lang]}/:slug`} element={<Pillar />} />
            <Route path="*" element={<Navigate to={href(lang, 'home')} replace />} />
          </Route>
        ))}
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
}
