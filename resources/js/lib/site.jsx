import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Site content comes from Laravel (resources/content/*.php + config/isnad.php).
 * The HTML shell embeds it as window.__ISNAD__ for an instant first render;
 * otherwise it is fetched from GET /api/content.
 */
const SiteContext = createContext(null);

export function SiteProvider({ children }) {
    const [data, setData] = useState(() => window.__ISNAD__ ?? null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) return;
        fetch('/api/content', { headers: { Accept: 'application/json' } })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
            .then(setData)
            .catch(setError);
    }, [data]);

    if (error) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-black p-8 text-center text-inverse">
                <div>
                    <p className="text-2xl font-semibold">We couldn’t load the site.</p>
                    <p className="mt-2 text-inverse-muted">Please check your connection and refresh the page.</p>
                </div>
            </div>
        );
    }
    if (!data) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-black" role="status" aria-live="polite">
                <span className="sr-only">Loading…</span>
                <span className="size-10 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
            </div>
        );
    }
    return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
}

/** Full payload: { site, donation, content } */
export function useSite() {
    return useContext(SiteContext);
}

/** Shortcut: useContent('impact') → resources/content/impact.php */
export function useContent(file) {
    return useContext(SiteContext).content[file] ?? {};
}
