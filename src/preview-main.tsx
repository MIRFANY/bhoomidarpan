import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home';
import './index.css';

createRoot(document.getElementById('preview-root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
