import { Link, useSearchParams } from 'react-router';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useContent, useSite } from '../lib/site';
import { PageHero } from '../components/PageHero';
import { PillButton } from '../components/PillButton';
import { Reveal } from '../components/Reveal';
import { Icon } from '../components/Icon';
import { SocialIcons } from '../components/SocialIcons';
import { ContactForm } from '../components/Forms';
import { emailHref } from '../lib/contact';
import { cn } from '../lib/cn';

export default function Contact() {
    const { site } = useSite();
    const c = useContent('contact');
    const [params] = useSearchParams();
    const topic = c.contact_topics.some((t) => t.value === params.get('topic')) ? params.get('topic') : '';
    const { email, phone, whatsapp } = site.contact;

    return (
        <>
            <PageHero eyebrow="Contact" title="We’d be glad to hear from you." accent={['hear', 'from', 'you.']}
                lead="Whether you’re a student, a donor, a journalist, or an organization exploring partnership — choose the topic that fits and we’ll make sure your message reaches the right person.">
                {whatsapp && <PillButton href={`https://wa.me/${whatsapp}`} external size="lg">Chat on WhatsApp</PillButton>}
            </PageHero>

            <section aria-labelledby="pathways-title" className="bg-paper py-20 md:py-28">
                <div className="container-page">
                    <h2 id="pathways-title" className="sr-only">Ways to reach us</h2>
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {c.contact_pathways.map((p, i) => (
                            <Reveal as="li" key={p.topic} delay={i * 0.05}>
                                <a href={emailHref(email, p.title)} target="_blank" rel="noopener noreferrer"
                                    className={cn('group flex h-full flex-col rounded-card-lg border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:bg-navy',
                                        topic === p.topic ? 'border-navy bg-blue-soft' : 'border-line')}>
                                    <span className="flex size-11 items-center justify-center rounded-full bg-blue-soft text-blue-strong transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"><Icon name={p.icon} /></span>
                                    <h3 className="mt-6 text-lg font-semibold tracking-normal text-ink transition-colors duration-300 group-hover:text-white">{p.title}</h3>
                                    <p className="mt-1.5 flex-1 text-sm text-muted transition-colors duration-300 group-hover:text-white/70">{p.body}</p>
                                    <span className="mt-5 text-sm font-semibold text-blue-strong transition-colors duration-300 group-hover:text-white">Write to us <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100">→</span></span>
                                </a>
                            </Reveal>
                        ))}
                    </ul>

                    <div id="message" className="mt-20 grid scroll-mt-28 gap-14 lg:grid-cols-12">
                        <aside aria-label="Contact details" className="on-dark space-y-8 rounded-card-lg bg-black p-8 text-inverse-muted md:p-10 lg:col-span-4">
                            <div>
                                <p className="text-2xl font-semibold text-white">ISNAD</p>
                                <p className="mt-2 flex items-center gap-2"><MapPin className="size-4 text-blue" aria-hidden="true" />{site.location}</p>
                            </div>
                            <dl className="space-y-6 border-t border-white/10 pt-7">
                                <div className="flex gap-4">
                                    <Mail className="mt-1 size-5 shrink-0 text-blue" aria-hidden="true" />
                                    <div><dt className="text-sm font-semibold text-white">Email</dt>
                                        <dd>{email ? <a href={emailHref(email)} target="_blank" rel="noopener noreferrer" className="break-all hover:text-white">{email}</a> : '[TO BE PROVIDED]'}</dd></div>
                                </div>
                                <div className="flex gap-4">
                                    <Phone className="mt-1 size-5 shrink-0 text-blue" aria-hidden="true" />
                                    <div><dt className="text-sm font-semibold text-white">Phone / WhatsApp</dt>
                                        <dd>{phone ? <a href={whatsapp ? `https://wa.me/${whatsapp}` : `tel:${phone.replace(/[\s-]/g, '')}`} target={whatsapp ? '_blank' : undefined} rel={whatsapp ? 'noopener noreferrer' : undefined} dir="ltr" className="hover:text-white">{phone}</a> : '[TO BE PROVIDED]'}</dd></div>
                                </div>
                                <div><dt className="mb-3 text-sm font-semibold text-white">Social media</dt><dd><SocialIcons /></dd></div>
                            </dl>
                            {whatsapp ? (
                                <PillButton href={`https://wa.me/${whatsapp}`} external className="w-full">
                                    <span className="inline-flex items-center gap-2"><MessageCircle className="size-5" aria-hidden="true" />Chat on WhatsApp</span>
                                </PillButton>
                            ) : (
                                <p className="rounded-pill border border-white/15 px-5 py-3 text-center text-sm">WhatsApp — number coming soon</p>
                            )}
                            <p className="text-sm">Connectivity in Gaza can be unpredictable. If we’re slow to reply, it isn’t for lack of interest — we’ll respond as soon as we can.</p>
                        </aside>
                        <div className="rounded-card-lg border border-line bg-soft p-6 sm:p-8 md:p-12 lg:col-span-8">
                            <h2 className="mb-8 text-[2rem] text-ink">Send us a message</h2>
                            <ContactForm defaultTopic={topic} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
