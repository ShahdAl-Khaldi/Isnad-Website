import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Photo } from './Photo';
import { cn } from '../lib/cn';

/**
 * One photo box that can hold several photos.
 * - 1 photo   → shown normally.
 * - 2+ photos → change automatically every `interval` ms (default 2 s):
 *     the new photo wipes in from the side over the previous one, with a slow zoom.
 *     Pauses on hover. Keeps running even while off-screen.
 *     With "reduce motion" on, the first photo is shown without rotating.
 */
export function PhotoSlideshow({ images = [], className, interval = 2000 }) {
    const list = images.filter((i) => i?.src);
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState(null);   // photo shown underneath while the new one wipes in
    const [step, setStep] = useState(0);      // bumps on every change so the animation restarts
    const [paused, setPaused] = useState(false);
    const reduce = useReducedMotion();
    const many = list.length > 1;
    const playing = many && !paused && !reduce;

    useEffect(() => {
        if (!playing) return;
        const t = setTimeout(() => goTo((index + 1) % list.length), interval);
        return () => clearTimeout(t);
    }, [index, playing, list.length, interval]);

    function goTo(i) {
        if (i === index) return;
        setPrev(index);
        setIndex(i);
        setStep((n) => n + 1);
    }

    // Preload the next photo so the transition never shows a blank frame.
    useEffect(() => {
        if (!many) return;
        const next = new Image();
        next.src = list[(index + 1) % list.length].src;
    }, [index, many, list]);

    if (images.length === 0) return null;
    if (!many) return <Photo image={list[0] ?? images[0]} className={className} />;

    const current = list[index];
    const under = prev !== null ? list[prev] : null;
    const enter = reduce || step === 0
        ? { initial: step === 0 ? false : { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
        : {
            initial: { clipPath: 'inset(0 0 0 100%)', scale: 1.12 },
            animate: { clipPath: 'inset(0 0 0 0%)', scale: 1 },
            transition: {
                clipPath: { duration: 1.1, ease: [0.77, 0, 0.18, 1] },
                scale: { duration: interval / 1000 + 1, ease: 'easeOut' },
            },
        };

    return (
        <div className={cn('group relative overflow-hidden shadow-[0_24px_50px_-28px_rgb(17_51_86/0.55)]', className)}
            role="group" aria-roledescription="slideshow" aria-label={`Photos (${list.length})`}
            onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
            <div className="absolute inset-0 bg-navy">
                {under && (
                    <img key={`under-${step}`} src={under.src} alt="" aria-hidden="true" decoding="async"
                        className="absolute inset-0 size-full object-cover brightness-75 transition-[filter] duration-700" />
                )}
                <motion.img key={`top-${step}`} src={current.src} alt={current.alt ?? ''} decoding="async" {...enter}
                    className="absolute inset-0 size-full object-cover" />
            </div>

        </div>
    );
}
