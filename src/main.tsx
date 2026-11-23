import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { captureOrigin } from './origin';

// Before the first render: the router may rewrite the landing URL and its campaign tags.
captureOrigin();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
