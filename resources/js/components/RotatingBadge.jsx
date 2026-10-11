import { Link } from 'react-router';
import { HeartHandshake } from 'lucide-react';
import { cn } from '../lib/cn';

/** Circular rotating text with a centre button — links to sponsorship. */
export function RotatingBadge({ to = '/sponsor', text = 'Sponsor a student • Support Gaza • ', className }) {
    return (
        <Link to={to} className={cn('group relative block size-32 md:size-36', className)} aria-label="Sponsor a student">
            <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow text-white/70" aria-hidden="true">
                <defs>
                    <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text fontSize="9" fontWeight="700" letterSpacing="2.2" fill="currentColor" style={{ textTransform: 'uppercase' }}>
                    <textPath href="#badge-circle">{text}</textPath>
                </text>
            </svg>
            <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-blue-strong text-white shadow-[0_0_0_8px_rgb(89_133_215/0.18)] transition-transform duration-300 group-hover:scale-110">
                <HeartHandshake className="size-6" strokeWidth={1.8} aria-hidden="true" />
            </span>
        </Link>
    );
}
