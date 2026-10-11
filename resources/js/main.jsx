import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import { SiteProvider } from './lib/site';
import App from './App';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SiteProvider>
                <App />
            </SiteProvider>
        </BrowserRouter>
    </StrictMode>,
);
