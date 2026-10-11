import { ImageIcon } from 'lucide-react';
import { cn } from '../lib/cn';

/** Authentic ISNAD photo when image.src is set; otherwise a clearly labelled placeholder (never stock imagery). */
export function Photo({ image, className, dark = false, eager = false, imgClassName }) {
    if (image?.src) {
        return (
            <div className={cn('relative overflow-hidden bg-soft', className)}>
                <img src={image.src} alt={image.alt ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined}
                    className={cn('absolute inset-0 size-full object-cover', imgClassName)} />
            </div>
        );
    }
    const label = image?.placeholder_label ?? image?.alt ?? 'Authentic ISNAD photo to be added';
    return (
        <div role="img" aria-label={`Photo placeholder: ${label}`}
            className={cn('relative flex items-center justify-center overflow-hidden', dark ? 'placeholder-texture-dark' : 'placeholder-texture', className)}>
            <div className={cn('mx-6 flex max-w-xs flex-col items-center gap-2 rounded-sm px-4 py-3 text-center text-xs', dark ? 'bg-white/5 text-inverse-muted' : 'bg-white/80 text-muted')}>
                <ImageIcon className="size-5 opacity-70" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-bold tracking-[0.14em] uppercase">Photo placeholder</span>
                <span className="leading-snug">{label}</span>
            </div>
        </div>
    );
}
