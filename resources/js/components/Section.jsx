import { cn } from '../lib/cn';

/** Section wrapper. tone: light | soft | dark (black) | navy */
export function Section({ tone = 'light', className, children, id, labelledBy }) {
    const tones = {
        light: 'bg-paper text-text',
        soft: 'bg-soft text-text',
        dark: 'on-dark bg-black text-inverse',
        navy: 'on-dark bg-navy text-inverse',
    };
    return (
        <section id={id} aria-labelledby={labelledBy} className={cn('relative py-24 md:py-32', tones[tone], className)}>
            <div className="container-page relative">{children}</div>
        </section>
    );
}

/** Heading + optional intro. (`eyebrow` is accepted for compatibility but not shown.) */
export function SectionHeader({ title, intro, id, align = 'start', dark = false, className, children }) {
    return (
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
            <h2 id={id} className={cn('display text-[2rem] md:text-[2.8rem]', dark ? 'text-white' : 'text-ink')}>{title}</h2>
            {intro && (
                <p className={cn('mt-6 max-w-2xl text-lg leading-relaxed', dark ? 'text-inverse-muted' : 'text-muted', align === 'center' && 'mx-auto')}>{intro}</p>
            )}
            {children}
        </div>
    );
}
