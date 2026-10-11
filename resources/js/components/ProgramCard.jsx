import { Users } from 'lucide-react';
import { Icon } from './Icon';
import { Photo } from './Photo';
import { StatusBadge } from './Bits';
import { useContent } from '../lib/site';
import { cn } from '../lib/cn';

export function ProgramCard({ program, reverse = false, index = 0 }) {
    const statusText = useContent('programs').program_status_description?.[program.status];
    return (
        <article id={program.slug} className="grid scroll-mt-40 gap-10 md:grid-cols-12 md:items-center md:gap-16">
            <div className={cn('relative md:col-span-6', reverse && 'md:order-2')}>
                <Photo image={program.image} className="aspect-[4/3] w-full rounded-card-lg" />
                <span className="absolute -top-5 start-6 flex size-14 items-center justify-center rounded-full bg-black text-sm font-bold text-white tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
            <div className="md:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-blue-soft text-blue-strong"><Icon name={program.icon} /></span>
                    <StatusBadge status={program.status} />
                    <span className="text-sm text-muted">{statusText}</span>
                </div>
                <h2 className="mt-7 text-[2rem] text-ink md:text-[2.6rem]">{program.title}</h2>
                <p className="mt-4 text-lg font-medium text-ink">{program.summary}</p>
                <p className="mt-4 leading-relaxed text-muted">{program.description}</p>
                <p className="mt-6 flex gap-3 rounded-card bg-soft p-5 text-[0.95rem]">
                    <Users className="mt-0.5 size-5 shrink-0 text-blue-strong" aria-hidden="true" />
                    <span><strong className="font-semibold text-ink">Who it’s for:</strong> {program.audience}</span>
                </p>
                {program.metrics?.length > 0 && (
                    <ul className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-line pt-7">
                        {program.metrics.map((m) => (
                            <li key={m.label}>
                                <p className="text-[2.2rem] leading-none font-semibold tracking-tight text-ink">{m.value}</p>
                                <p className="mt-2 max-w-[15rem] text-sm text-muted">{m.label}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}
