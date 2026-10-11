import { Link } from 'react-router';
import { useContent } from '../lib/site';
import { PageHero } from '../components/PageHero';
import { Icon } from '../components/Icon';
import { PhotoSlideshow } from '../components/PhotoSlideshow';
import { StatusBadge } from '../components/Bits';
import { MetricValue } from '../components/Metric';
import { CtaBand } from '../components/CtaBand';
import { cn } from '../lib/cn';

/*
 * ABOUT — one page for: our story · our impact · what we do.
 * Content comes from resources/content/timeline.php, impact.php and programs.php.
 */

function Heading({ id, children }) {
    return <h2 id={id} className="display text-[2rem] text-ink md:text-[2.6rem]">{children}</h2>;
}

function Journey() {
    const entries = useContent('timeline').timeline ?? [];
    return (
        <section aria-labelledby="journey-title" className="bg-paper py-20 md:py-24">
            <div className="container-page max-w-6xl">
                <Heading id="journey-title">Our story</Heading>
                <ol className="relative mt-12 border-s-2 border-line ps-8 md:ps-12">
                    {entries.map((e, i) => {
                        const tone = e.tone ?? 'default';
                        // One photo (`image`) or several (`images`) — several rotate automatically.
                        const photos = e.images ?? (e.image ? [e.image] : []);
                        return (
                            <li key={e.id} className="relative pb-14 last:pb-0">
                                <span aria-hidden="true" className={cn(
                                    'absolute -start-[calc(2rem+9px)] top-0.5 flex size-4 rounded-full border-2 md:-start-[calc(3rem+9px)]',
                                    tone === 'loss' ? 'border-black bg-black' : tone === 'future' ? 'border-navy bg-white' : 'border-navy bg-navy',
                                )} />
                                <div className={cn('grid gap-6', photos.length > 0 && 'md:grid-cols-5 md:gap-10')}>
                                    <div className="md:col-span-3">
                                        <p className="text-sm font-semibold text-muted">
                                            {e.marker}{e.period && ` · ${e.period}`}
                                        </p>
                                        <h3 className="mt-1 text-[1.4rem] text-ink [text-shadow:0_9px_10px_rgb(17_51_86/0.25)] md:text-[1.6rem]">{e.title}</h3>
                                        <div className="mt-3 space-y-3 leading-relaxed text-muted">
                                            {e.body.map((p, j) => <p key={j}>{p}</p>)}
                                        </div>
                                    </div>
                                    {/* Photo for this step — set image.src in resources/content/timeline.php */}
                                    {photos.length > 0 && <PhotoSlideshow images={photos} interval={2500} className="aspect-[4/3] w-full rounded-[1.75rem] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-5 hover:scale-[1.02] hover:shadow-[0_50px_80px_-20px_rgb(17_51_86/0.7)] md:col-span-2" />}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

function Impact() {
    const snapshot = useContent('impact').impact_snapshot ?? [];
    return (
        <section aria-labelledby="impact-title" className="bg-navy py-20 text-white md:py-24">
            <div className="container-page">
                <h2 id="impact-title" className="display text-[2rem] text-white md:text-[2.6rem]">Our impact so far</h2>
                <ul className="mt-12 grid gap-px overflow-hidden bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                    {snapshot.map((m) => (
                        <li key={m.id} className="bg-navy p-7">
                            <MetricValue metric={m} className={cn('text-white', m.value === null ? 'text-[2rem]' : 'text-[3rem]')} />
                            <h3 className="mt-4 text-base text-white">{m.label}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/70">{m.context}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 max-w-3xl text-sm text-white/70">
                    These are approximate figures from different periods. Monthly numbers describe how many students a space supported each month and
                    are not added together. A verified total of unique students will be published once confirmed.
                </p>
            </div>
        </section>
    );
}

function Programs() {
    const programs = useContent('programs').programs ?? [];
    return (
        <section aria-labelledby="programs-title" className="bg-soft py-20 md:py-24">
            <div className="container-page">
                <Heading id="programs-title">What we do</Heading>
                <ul className="mt-12 grid gap-5 md:grid-cols-2">
                    {programs.map((p) => (
                        <li key={p.slug} className="flex gap-5 border border-line bg-paper p-7">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-soft text-navy"><Icon name={p.icon} /></span>
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-lg text-ink">{p.title}</h3>
                                    <StatusBadge status={p.status} />
                                </div>
                                <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>
                                <p className="mt-3 text-sm text-muted"><span className="font-semibold text-ink">For:</span> {p.audience}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-sm text-muted">
                    <strong className="text-ink">Active</strong> programs are running now. <strong className="text-ink">Planned</strong> programs are ready to start with the right support —{' '}
                    <Link to="/contact?topic=partnership" className="font-semibold text-navy underline underline-offset-2">talk to us</Link>.
                </p>
            </div>
        </section>
    );
}

export default function About() {
    const closing = useContent('timeline').story_closing;
    return (
        <>
            <PageHero eyebrow="About" title="About ISNAD"
                lead="ISNAD is a student-support initiative in Gaza. We give university students a free space to study, with electricity, internet, practical training and a community — so their education can continue." />
            <Journey />
            <Impact />
            <Programs />
            <CtaBand title={closing.title} />
        </>
    );
}
