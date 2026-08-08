import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { I18nProvider } from './i18n';

const Landing = lazy(() => import('./pages/Landing'));
const Site = lazy(() => import('./pages/Site'));
const Pillar = lazy(() => import('./pages/Pillar'));

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* "Coming soon" landing — the public face until launch */}
          <Route path="/" element={<Suspense fallback={null}><Landing /></Suspense>} />

          {/* New site, pre-launch */}
          <Route path="/demo" element={<Suspense fallback={null}><Site /></Suspense>} />
          <Route path="/demo/pillars/:slug" element={<Suspense fallback={null}><Pillar /></Suspense>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
