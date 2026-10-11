import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { cn } from '../lib/cn';

/** Alternating timeline with a progress line that fills as you scroll. */
export function Timeline({ entries }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
    return (
        <ol ref={ref} className="relative">
            <span aria-hidden="true" className="absolute inset-y-0 start-[1.05rem] w-px bg-line md:start-1/2" />
            <motion.span aria-hidden="true" style={{ scaleY }} className="absolute inset-y-0 start-[1.05rem] w-px origin-top bg-navy md:start-1/2" />
            {entries.map((e, i) => <TimelineItem key={e.id} entry={e} index={i} flip={i % 2 === 1} />)}
        </ol>
    );
}

function TimelineItem({ entry, index, flip }) {
    const tone = entry.tone ?? 'default';
    return (
        <li className="relative grid gap-8 pb-24 ps-14 last:pb-0 md:grid-cols-2 md:gap-20 md:ps-0">
            <span aria-hidden="true" className={cn(
                'absolute top-0 start-0 z-10 flex size-[2.1rem] items-center justify-center rounded-full border text-[0.7rem] font-bold tabular-nums md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2',
                tone === 'loss' ? 'border-black bg-black text-white' : tone === 'future' ? 'border-navy bg-navy text-white' : 'border-line bg-paper text-ink',
            )}>
                {String(index + 1).padStart(2, '0')}
            </span>

            <Reveal className={cn('md:pe-10', flip && 'md:order-2 md:ps-10 md:pe-0')}>
                <p className={cn('text-sm font-medium', tone === 'future' ? 'text-navy' : 'text-muted')}>
                    {entry.marker}
                    {entry.period && <span className="ms-2 font-medium tracking-normal normal-case">· {entry.period}</span>}
                </p>
                <h2 className="mt-3 text-[1.9rem] text-ink md:text-[2.3rem]">{entry.title}</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-muted">
                    {entry.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                {entry.highlights?.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {entry.highlights.map((h) => (
                            <li key={h} className="rounded-pill border border-line bg-soft px-3.5 py-1.5 text-sm font-medium text-ink">{h}</li>
                        ))}
                    </ul>
                )}
            </Reveal>

            <Reveal delay={0.1} className={cn(flip && 'md:order-1')}>
                {entry.image ? (
                    <Photo image={entry.image} className="aspect-[4/3] w-full rounded-card-lg" />
                ) : (
                    <div className="hidden h-full items-center md:flex">
                        <p className="text-[2.2rem] leading-tight font-semibold tracking-tight text-navy">What comes next depends on who builds it with us.</p>
                    </div>
                )}
            </Reveal>
        </li>
    );
}
