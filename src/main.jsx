import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx';
import { LanguageProvider } from './components/LanguageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
)
