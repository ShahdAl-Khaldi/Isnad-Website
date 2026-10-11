import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useSite } from './lib/site';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Sponsor = lazy(() => import('./pages/Sponsor'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const TITLES = {
    '/about': 'About',
    '/sponsor': 'Sponsor a Student',
    '/contact': 'Contact',
    '/privacy': 'Privacy Policy',
};

/** Scroll to top (or to #hash) and update the tab title on every page change. */
function RouteEffects() {
    const { pathname, hash } = useLocation();
    const { site } = useSite();
    useEffect(() => {
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    }, []);
    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.slice(1));
            if (el) { el.scrollIntoView(); return; }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);
    useEffect(() => {
        const page = TITLES[pathname];
        document.title = pathname === '/' ? `${site.name} — ${site.tagline}` : `${page ?? 'Page not found'} · ${site.name}`;
        document.getElementById('main')?.focus({ preventScroll: true });
    }, [pathname, site]);
    return null;
}

function PageLoading() {
    return (
        <div className="flex min-h-[100svh] items-center justify-center bg-black" role="status" aria-live="polite">
            <span className="sr-only">Loading…</span>
            <span className="size-10 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
        </div>
    );
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-pill focus:bg-blue-strong focus:px-5 focus:py-2.5 focus:text-white">
                Skip to content
            </a>
            <RouteEffects />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
                <Suspense fallback={<PageLoading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/sponsor" element={<Sponsor />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    {/* Old addresses → new pages */}
                    <Route path="/our-story" element={<Navigate to="/about" replace />} />
                    <Route path="/impact" element={<Navigate to="/about" replace />} />
                    <Route path="/programs" element={<Navigate to="/about" replace />} />
                    <Route path="/updates" element={<Navigate to="/about" replace />} />
                    <Route path="/partner" element={<Navigate to="/sponsor" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
            </main>
            <Footer />
        </MotionConfig>
    );
}
