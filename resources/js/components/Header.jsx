import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, Menu, MessageCircle, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useSite } from '../lib/site';
import { emailHref } from '../lib/contact';
import { cn } from '../lib/cn';

/**
 * Institutional header (white, sticky):
 *  navy logo · navigation · "Sponsor a Student" button
 */
export function Header() {
    const { site, content } = useSite();
    const nav = content.navigation.main_nav;
    const sponsor = content.navigation.sponsor_nav_item;
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toggleRef = useRef(null);
    const { email, whatsapp } = site.contact;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className={cn('sticky top-0 z-50 bg-paper transition-shadow duration-300', scrolled && 'shadow-[0_1px_0_var(--isnad-line),0_8px_24px_-16px_rgb(0_0_0/0.25)]')}>
            {/* Main bar */}
            <div className="border-b border-line">
                <div className="container-page flex h-[var(--isnad-header-h)] items-center justify-between gap-6">
                    <Logo light={false} />

                    <nav aria-label="Main" className="hidden lg:block">
                        <ul className="flex items-center">
                            {nav.map((item) => (
                                <li key={item.href}>
                                    <NavLink to={item.href} end={item.href === '/'}
                                        className={({ isActive }) => cn(
                                            'relative flex h-[var(--isnad-header-h)] items-center px-4 text-[0.95rem] font-semibold transition-colors',
                                            'after:absolute after:inset-x-4 after:top-[calc(50%+12px)] after:h-[3px] after:rounded-full after:bg-navy after:shadow-[0_0_8px_1px_rgb(17_51_86/0.55)] after:transition-transform after:duration-300 dark:after:bg-[#2f6fb3] dark:after:shadow-[0_0_10px_2px_rgb(47_111_179/0.75)]',
                                            isActive ? 'text-navy after:scale-x-100' : 'text-ink/75 after:scale-x-0 hover:text-navy hover:after:scale-x-100',
                                        )}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3">
                        <ThemeToggle className="hidden sm:flex" />
                        <NavLink to={sponsor.href}
                            className="hidden h-11 items-center rounded-sm bg-navy px-5 text-[0.92rem] font-bold text-white shadow-[0_0_0_1px_rgb(169_187_211/0.35)] transition-colors hover:bg-black dark:bg-[#2f6fb3] dark:shadow-[0_0_20px_-4px_rgb(47_111_179/0.7)] dark:hover:bg-[#3a80c9] sm:flex">
                            {sponsor.label}
                        </NavLink>
                        <button ref={toggleRef} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="site-menu"
                            className="flex size-11 items-center justify-center rounded-sm border border-line text-ink hover:border-navy lg:hidden">
                            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.nav id="site-menu" aria-label="Menu"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden border-b border-line bg-paper lg:hidden">
                        <ul className="container-page max-h-[calc(100dvh-var(--isnad-header-h))] overflow-y-auto py-3">
                            {nav.map((item) => (
                                <li key={item.href}>
                                    <NavLink to={item.href} end={item.href === '/'}
                                        className={({ isActive }) => cn('flex items-center justify-between border-b border-line py-4 text-lg font-semibold', isActive ? 'text-navy' : 'text-ink')}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="flex items-center justify-between gap-4 py-5">
                                <NavLink to={sponsor.href} className="flex h-13 flex-1 items-center justify-center rounded-sm bg-navy font-bold text-white dark:bg-[#2f6fb3]">{sponsor.label}</NavLink>
                                <ThemeToggle />
                            </li>
                            <li className="flex flex-wrap gap-x-6 gap-y-2 pb-4 text-sm text-muted">
                                {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a>}
                                {email && <a href={emailHref(email)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Mail className="size-4" aria-hidden="true" />{email}</a>}
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
