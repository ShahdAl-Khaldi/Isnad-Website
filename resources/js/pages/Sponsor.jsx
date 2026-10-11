import { Lock } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../lib/site';
import { PageHero } from '../components/PageHero';
import { PillButton } from '../components/PillButton';
import { Section, SectionHeader } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { SponsorshipCard } from '../components/Donate';

export default function Sponsor() {
    const s = useContent('sponsorship');
    const partnership = useContent('partnership').partnership_opportunities ?? [];
    return (
        <>
            <PageHero eyebrow="Sponsor a Student" title="Keep a student learning — one month, one workshop at a time." accent={['learning']}
                lead="Your sponsorship gives a student in Gaza something concrete: a place with power and internet to study, or a seat in a practical workshop. It stays free for them because sponsors make it possible.">
                <PillButton href="#options" size="lg">See sponsorship options</PillButton>
            </PageHero>

            <Section id="options" labelledBy="options-title">
                <SectionHeader eyebrow="Sponsorship options" id="options-title" title="Two simple ways to sponsor." />
                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {s.sponsorship_options.map((o, i) => (
                        <Reveal key={o.id} delay={i * 0.1}><SponsorshipCard option={o} featured={i === 0} /></Reveal>
                    ))}
                </div>
                <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
                    About the $100 monthly sponsorship: it supports a student’s access to a study space and the related operational resources that keep
                    it running. A detailed, verified breakdown of what each sponsorship covers will be published on this page.
                </p>
            </Section>

            <section className="border-y border-line bg-soft">
                <p className="container-page flex gap-3 py-6 text-sm text-muted">
                    <Lock className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
                    <span>Donations are made safely on PayPal — ISNAD never sees your card details. Your gift is complete once PayPal confirms it and emails your receipt.
                        Tax-deductibility depends on your country; <Link to="/contact?topic=sponsorship" className="font-semibold text-navy underline underline-offset-2">ask us</Link> if it matters to you.</span>
                </p>
            </section>

            <Section tone="navy" id="organizations" labelledBy="org-title">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <h2 id="org-title" className="display text-[2rem] text-white md:text-[2.6rem]">For organizations</h2>
                        <p className="mt-5 text-lg leading-relaxed text-white/80">
                            NGOs, universities, foundations and companies can support ISNAD over the long term. Tell us what you have in mind and we’ll
                            reply with our needs, plans and how we report.
                        </p>
                        <Link to="/contact?topic=partnership#message" className="mt-8 inline-flex h-12 items-center rounded-sm bg-white px-6 font-bold text-[var(--isnad-navy)] transition-colors hover:bg-blue-soft">
                            Talk to us about a partnership
                        </Link>
                    </div>
                    <ul className="grid gap-px self-start overflow-hidden bg-white/15 sm:grid-cols-2 lg:col-span-7">
                        {partnership.map((o) => (
                            <li key={o.title} className="bg-navy p-6 sm:[&:last-child:nth-child(odd)]:col-span-2">
                                <p className="font-bold text-white">{o.title}</p>
                                <p className="mt-1 text-sm text-white/75">{o.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

        </>
    );
}
