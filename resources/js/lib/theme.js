import { useSyncExternalStore } from 'react';

const KEY = 'isnad-theme';
const listeners = new Set();

function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) { /* storage unavailable */ }
    listeners.forEach((l) => l());
}

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

/** Reads the current site theme ('light' | 'dark') and stays in sync across every component that uses it. */
export function useTheme() {
    const theme = useSyncExternalStore(subscribe, getTheme, () => 'light');
    const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    return [theme, toggle];
}
