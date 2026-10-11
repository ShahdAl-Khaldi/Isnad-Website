import { Link } from 'react-router';
import { useSite } from '../lib/site';
import { cn } from '../lib/cn';

export function Logo({ light = true, className }) {
    const { site } = useSite();
    const onDark = site.logo.src_on_dark || site.logo.src;
    const src = light ? onDark : site.logo.src;
    return (
        <Link to="/" className={cn('inline-flex items-center gap-3', className)} aria-label={`${site.name} — home`}>
            {site.logo.src ? (
                <>
                    {/* Site theme toggle also needs the light logo once the page itself goes dark. */}
                    <img src={src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height}
                        className={cn('h-6 w-auto md:h-7', !light && 'dark:hidden')} />
                    {!light && <img src={onDark} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} className="hidden h-6 w-auto md:h-7 dark:block" />}
                </>
            ) : (
                <span className={cn('text-2xl font-bold tracking-[0.1em]', light ? 'text-white' : 'text-navy dark:text-white')}>ISNAD</span>
            )}
        </Link>
    );
}
