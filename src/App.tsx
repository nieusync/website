import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { I18nProvider } from './i18n';

const Landing = lazy(() => import('./pages/Landing'));
const Site = lazy(() => import('./pages/Site'));
const Pillar = lazy(() => import('./pages/Pillar'));
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'));
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'));
const ClientArea = lazy(() => import('./pages/ClientArea'));
const Legal = lazy(() => import('./pages/Legal'));
const LegalIndex = lazy(() => import('./pages/LegalIndex'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* "Coming soon" landing: the public face until launch */}
          <Route path="/" element={<Suspense fallback={null}><Landing /></Suspense>} />

          {/* New site, pre-launch. Portuguese slugs: the audience is pt-PT and the
              old site's URLs were Portuguese too. */}
          <Route path="/demo" element={<Suspense fallback={null}><Site /></Suspense>} />
          <Route path="/demo/who-we-are" element={<Suspense fallback={null}><WhoWeAre /></Suspense>} />
          <Route path="/demo/what-we-do" element={<Suspense fallback={null}><WhatWeDo /></Suspense>} />
          <Route path="/demo/client-area" element={<Suspense fallback={null}><ClientArea /></Suspense>} />
          <Route path="/demo/contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
          <Route path="/demo/legal" element={<Suspense fallback={null}><LegalIndex /></Suspense>} />
          <Route path="/demo/legal/:slug" element={<Suspense fallback={null}><Legal /></Suspense>} />
          <Route path="/demo/pillars/:slug" element={<Suspense fallback={null}><Pillar /></Suspense>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
