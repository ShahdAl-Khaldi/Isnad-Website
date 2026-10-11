import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';

/**
 * Signature pill button: label + circular arrow.
 * variant: blue | light | dark | outline-light | outline-dark
 */
const variants = {
    blue: 'bg-navy text-white hover:bg-navy-deep [--dot:white] [--dot-fg:var(--isnad-navy)]',
    light: 'bg-white text-black hover:bg-blue-soft [--dot:var(--isnad-navy)] [--dot-fg:white]',
    dark: 'bg-black text-white hover:bg-navy [--dot:white] [--dot-fg:black]',
    'outline-light': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5 [--dot:white] [--dot-fg:black]',
    'outline-dark': 'border border-ink/15 text-ink hover:border-ink/50 [--dot:black] [--dot-fg:white]',
};

export function pillClasses(variant = 'blue', size = 'md', className = '') {
    return cn(
        'group inline-flex items-center justify-between gap-4 rounded-pill font-semibold transition-colors duration-300 select-none',
        size === 'lg' ? 'h-15 ps-7 pe-2 text-[0.95rem]' : size === 'sm' ? 'h-11 ps-5 pe-1.5 text-sm' : 'h-13 ps-6 pe-1.5 text-[0.92rem]',
        variants[variant],
        className,
    );
}

export function ArrowDot({ external = false, size = 'md' }) {
    const Arrow = external ? ArrowUpRight : ArrowRight;
    return (
        <span
            className={cn(
                'flex shrink-0 items-center justify-center rounded-full bg-[var(--dot)] text-[var(--dot-fg)] transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100',
                size === 'lg' ? 'size-11' : size === 'sm' ? 'size-8' : 'size-10',
                external && 'group-hover:rotate-0 group-hover:scale-110',
            )}
            aria-hidden="true"
        >
            <Arrow className="size-4" strokeWidth={2} />
        </span>
    );
}

export function PillButton({ to, href, children, variant = 'blue', size = 'md', external = false, className, ...rest }) {
    const inner = (
        <>
            <span>{children}</span>
            <ArrowDot external={external} size={size} />
        </>
    );
    const classes = pillClasses(variant, size, className);
    if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>;
    if (href) return <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{inner}</a>;
    return <button type="button" className={classes} {...rest}>{inner}</button>;
}

/** Text link with a small circular arrow. */
export function ArrowLink({ to, children, light = false, className }) {
    return (
        <Link to={to} className={cn('group inline-flex items-center gap-3 text-[0.95rem] font-semibold underline-offset-4 hover:underline', light ? 'text-white' : 'text-ink', className)}>
            {children}
            <span className={cn('flex size-9 items-center justify-center rounded-full border transition-colors duration-300', light ? 'border-white/30 group-hover:bg-white group-hover:text-black' : 'border-ink/20 group-hover:bg-navy group-hover:border-navy group-hover:text-white')}>
                <ArrowRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden="true" />
            </span>
        </Link>
    );
}
