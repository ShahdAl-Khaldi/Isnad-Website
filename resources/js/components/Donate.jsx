import { Check, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { Icon } from './Icon';
import { ArrowDot, pillClasses } from './PillButton';
import { useSite } from '../lib/site';
import { donationHint, donationUrl, formatMoney } from '../lib/donation';
import { cn } from '../lib/cn';

/**
 * Opens the external PayPal page (PAYPAL_DONATION_URL in Laravel's .env).
 * No payment details are collected on this site. If the link isn't configured,
 * shows an honest "coming soon" state instead.
 */
export function DonateButton({ label, amount, itemName, variant = 'blue', size = 'lg', hint = true, dark = false, className }) {
    const { donation } = useSite();
    const href = donationUrl(donation, amount, itemName);
    return (
        <div className={cn('flex flex-col gap-2.5', className)}>
            {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={pillClasses(variant, size, 'w-full')}>
                    <span>{label} <span className="sr-only">(opens PayPal in a new tab)</span></span>
                    <ArrowDot external size={size} />
                </a>
            ) : (
                <span role="link" aria-disabled="true" className={pillClasses(variant, size, 'w-full cursor-not-allowed opacity-60')}>
                    <span>Donation link coming soon</span>
                    <span className="flex size-10 items-center justify-center"><Clock className="size-4" aria-hidden="true" /></span>
                </span>
            )}
            {hint && (
                <p className={cn('text-xs', dark ? 'text-inverse-muted' : 'text-muted')}>
                    {href ? donationHint(donation, amount) : (
                        <>Online giving isn’t open yet. <Link to="/contact?topic=sponsorship" className="underline underline-offset-2">Contact us</Link> to sponsor now.</>
                    )}
                </p>
            )}
        </div>
    );
}

export function SponsorshipCard({ option, featured = false }) {
    const { donation } = useSite();
    return (
        <article id={option.id} aria-labelledby={`${option.id}-title`} className={cn(
            'relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-card-lg p-8 md:p-10',
            featured ? 'on-dark bg-black text-inverse' : 'border border-line bg-paper',
        )}>
            {featured && <span className="absolute end-8 top-8 rounded-pill bg-white px-3 py-1 text-xs font-bold text-black">Monthly</span>}
            <span className={cn('flex size-12 items-center justify-center rounded-full', featured ? 'bg-white/10 text-blue' : 'bg-blue-soft text-blue-strong')}>
                <Icon name={option.icon} className="size-6" />
            </span>
            <h3 id={`${option.id}-title`} className={cn('mt-7 text-[1.6rem]', featured ? 'text-white' : 'text-ink')}>{option.title}</h3>
            <p className={cn('mt-6 text-[4rem] leading-none font-semibold tracking-tight', featured ? 'text-white' : 'text-ink')}>
                {formatMoney(option.amount, donation.currency)}
                <span className={cn('ms-2 text-base font-medium tracking-normal', featured ? 'text-inverse-muted' : 'text-muted')}>{option.unit}</span>
            </p>
            <p className={cn('mt-6 text-[1.05rem] leading-relaxed', featured ? 'text-inverse-muted' : 'text-muted')}>{option.description}</p>
            <ul className={cn('mt-7 flex-1 space-y-3 border-t pt-7', featured ? 'border-white/10' : 'border-line')}>
                {option.details.map((d) => (
                    <li key={d} className="flex gap-3 text-[0.95rem]">
                        <Check className={cn('mt-1 size-4 shrink-0', featured ? 'text-white' : 'text-navy')} aria-hidden="true" />
                        <span className={featured ? 'text-inverse' : 'text-ink'}>{d}</span>
                    </li>
                ))}
            </ul>
            <DonateButton className="mt-9" label={option.cta} amount={option.amount} itemName={option.title} variant={featured ? 'blue' : 'dark'} dark={featured} />
        </article>
    );
}
