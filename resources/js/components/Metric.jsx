import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useContent } from '../lib/site';
import { cn } from '../lib/cn';

export function CountUp({ value, prefix = '', suffix = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
    const reduce = useReducedMotion();
    const [n, setN] = useState(reduce ? value : 0);
    useEffect(() => {
        if (!inView || reduce) return;
        const c = animate(0, value, { duration: Math.min(2, 0.9 + value / 220), ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
        return () => c.stop();
    }, [inView, reduce, value]);
    return (
        <span ref={ref} className="tabular-nums">
            <span aria-hidden="true">{prefix}{n.toLocaleString('en-US')}{suffix}</span>
            <span className="sr-only">{prefix === '~' ? 'approximately ' : ''}{value}{suffix === '+' ? ' or more' : suffix}</span>
        </span>
    );
}

export function MetricValue({ metric, className }) {
    const numeric = metric.value !== null && !metric.display;
    return (
        <p className={cn('leading-none font-semibold tracking-tight', className)}>
            {numeric ? (
                <CountUp value={metric.value} prefix={metric.prefix ?? ''} suffix={metric.suffix ?? ''} />
            ) : (
                <>
                    {metric.prefix && <span aria-hidden="true">{metric.prefix}</span>}
                    {metric.prefix === '~' && <span className="sr-only">approximately </span>}
                    {metric.display}
                </>
            )}
        </p>
    );
}

/** variant: grid (bordered cell, on dark) | tile (card, on light) */
export function MetricCard({ metric, variant = 'grid' }) {
    const labels = useContent('impact').metric_kind_label ?? {};
    const soft = metric.kind === 'pending' || metric.kind === 'qualitative';
    const pending = metric.kind === 'pending';
    if (variant === 'tile') {
        return (
            <div className={cn('flex h-full flex-col rounded-card border p-7', pending ? 'border-dashed border-ink/20 bg-transparent' : 'border-line bg-paper')}>
                <p className="mb-5 text-sm font-medium text-blue-strong">{labels[metric.kind]}</p>
                <MetricValue metric={metric} className={cn(soft ? 'text-[1.7rem]' : 'text-[2.8rem]', pending ? 'text-muted' : 'text-ink')} />
                <h3 className="mt-4 text-base font-semibold tracking-normal text-ink">{metric.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{metric.context}</p>
            </div>
        );
    }
    return (
        <div className="flex h-full flex-col p-7 md:p-9">
            <p className="mb-8 text-sm font-medium text-blue">{labels[metric.kind]}</p>
            <MetricValue metric={metric} className={cn('text-white', soft ? 'text-[2.6rem] md:text-[3rem]' : 'text-[3.6rem] md:text-[4.4rem]')} />
            <h3 className="mt-6 text-base font-semibold tracking-normal text-white">{metric.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-inverse-muted">{metric.context}</p>
        </div>
    );
}
