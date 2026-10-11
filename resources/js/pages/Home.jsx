import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useContent, useSite } from '../lib/site';
import { formatMoney } from '../lib/donation';
import { Icon } from '../components/Icon';
import { PhotoSlideshow } from '../components/PhotoSlideshow';
import { CountUp } from '../components/Metric';

/*
 * HOMEPAGE — kept deliberately simple:
 *   1. Photo + who we are + two buttons
 *   2. Three key numbers
 *   3. How we help students
 *   4. Our story in short
 *   5. How you can help (3 clear choices)
 */

const btn = {
    navy: 'inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-navy px-6 font-bold text-white transition-colors hover:bg-black',
    outline: 'inline-flex h-12 items-center justify-center gap-2 rounded-sm border-2 border-navy px-6 font-bold text-navy transition-colors hover:bg-navy hover:text-white',
};

function Title({ id, children, center = false }) {
    return (
        <h2 id={id} className={`display text-[2rem] text-ink md:text-[2.6rem] ${center ? 'text-center' : ''}`}>{children}</h2>
    );
}

/* 1. Photo + intro */
function Hero() {
    const img = useContent('home').hero_image;
    return (
        <section aria-labelledby="hero-title">
            {/* Hero photo: fades in, then zooms very slowly (off for reduced-motion users) */}
            <figure className="relative overflow-hidden bg-black">
                <motion.img src={img.src} alt={img.alt} fetchPriority="high"
                    initial={{ opacity: 0, scale: 1.14, y: 28 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ opacity: { duration: 1.4, ease: 'easeOut' }, y: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 9, ease: [0.25, 0.1, 0.25, 1] } }}
                    className="aspect-[4/3] w-full object-cover object-[50%_75%] sm:aspect-[16/9] lg:max-h-[82vh]" />
                <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-150%' }} animate={{ x: '150%' }}
                    transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }} />
                {img.caption && <figcaption className="absolute end-0 bottom-0 bg-black/65 px-4 py-2 text-xs text-white/90 md:text-sm">{img.caption}</figcaption>}
            </figure>
            <div className="container-page py-14 text-center md:py-20">
                <h1 id="hero-title" className="display mx-auto max-w-3xl text-[2.3rem] text-ink md:text-[3.4rem]">
                    Helping students in Gaza keep learning.
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                    ISNAD gives university students a free space to study — with electricity, internet and free training — so the war doesn’t end their education.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to="/sponsor" className={btn.navy}>Sponsor a student</Link>
                    <Link to="/about" className={btn.outline}>Learn about us</Link>
                </div>
            </div>
        </section>
    );
}

/* 2. Key numbers */
function Numbers() {
    const items = [
        { value: 30, prefix: '~', label: 'students a month in our first study space' },
        { value: 500, suffix: '+', label: 'students in our free workshops' },
        { text: 'Free', label: 'for every student who uses our spaces' },
    ];
    return (
        <section aria-label="ISNAD in numbers" className="bg-navy text-white">
            <ul className="container-page grid divide-y divide-white/15 py-4 text-center md:grid-cols-3 md:divide-x md:divide-y-0 md:py-12">
                {items.map((item) => (
                    <li key={item.label} className="px-6 py-8 md:py-2">
                        <p className="text-[3rem] font-extrabold leading-none">
                            {item.text ?? <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />}
                        </p>
                        <p className="mt-3 text-white/80">{item.label}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* 3. How we help */
function HowWeHelp() {
    const services = useContent('services').services ?? [];
    return (
        <section aria-labelledby="help-title" className="bg-paper py-20 md:py-24">
            <div className="container-page">
                <Title id="help-title" center>How we help students</Title>
                <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s) => (
                        <li key={s.title} className="text-center">
                            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-soft text-navy"><Icon name={s.icon} className="size-7" /></span>
                            <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
                            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* 4. Story in short */
function Story() {
    const home = useContent('home');
    return (
        <section aria-labelledby="story-title" className="bg-soft py-20 md:py-24">
            <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
                {/* Story photo: slides in on scroll; on hover it lifts with a bold navy glow and a light sweeps across it */}
                <motion.figure
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative">
                    <span aria-hidden="true" className="pointer-events-none absolute -inset-x-2 -bottom-8 h-24 scale-90 rounded-full bg-navy/0 blur-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-navy/55" />
                    <motion.div whileHover={{ y: -16, scale: 1.015 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgb(17_51_86/0.5)] ring-1 ring-navy/0 transition-[box-shadow,ring-color] duration-300 group-hover:shadow-[0_50px_80px_-25px_rgb(17_51_86/0.55)] group-hover:ring-navy/25">
                        {home.story_images?.length > 1 ? (
                            <PhotoSlideshow images={home.story_images} interval={2500} className="aspect-[4/3] w-full" />
                        ) : (
                            <img src={home.story_image.src} alt={home.story_image.alt} loading="lazy"
                                className="aspect-[4/3] w-full object-cover" />
                        )}
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    </motion.div>
                </motion.figure>
                <div>
                    <Title id="story-title">Our story</Title>
                    <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                        <p>About a year ago, students in Gaza had no power, no internet and no safe space to study. So we rented a small room and opened it to them for free.</p>
                        <p>Since then we’ve worked from five different spaces — one was destroyed in an attack. Each time, we opened again. Today we have a larger flat with a training room and a student workspace.</p>
                    </div>
                    <Link to="/about" className={`${btn.outline} mt-8`}>Read the full story</Link>
                </div>
            </div>
        </section>
    );
}

/* 5. How you can help */
function WaysToHelp() {
    const { donation } = useSite();
    const options = useContent('sponsorship').sponsorship_options ?? [];
    const study = options.find((o) => o.id === 'study-space');
    const seat = options.find((o) => o.id === 'workshop-seat');
    const ways = [
        study && { price: formatMoney(study.amount, donation.currency), unit: 'a month', title: 'Sponsor a student', text: 'Gives one student a desk, electricity and internet for a whole month.', to: '/sponsor#study-space', cta: 'Sponsor a student', primary: true },
        seat && { price: formatMoney(seat.amount, donation.currency), unit: 'once', title: 'Sponsor a workshop seat', text: 'Gives one student a place in a three-hour practical workshop.', to: '/sponsor#workshop-seat', cta: 'Sponsor a seat' },
        { price: 'Organizations', unit: '', title: 'Partner with us', text: 'For NGOs, universities and companies who want to support students long-term.', to: '/sponsor#organizations', cta: 'Partner with us' },
    ].filter(Boolean);
    return (
        <section aria-labelledby="ways-title" className="bg-paper py-20 md:py-24">
            <div className="container-page">
                <Title id="ways-title" center>How you can help</Title>
                <ul className="mt-12 grid gap-5 md:grid-cols-3">
                    {ways.map((w) => (
                        <li key={w.title} className={`flex flex-col rounded-sm p-8 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_35px_55px_-20px_rgb(17_51_86/0.45)] ${w.primary ? 'bg-navy text-white' : 'border border-line bg-paper'}`}>
                            <p className={`font-extrabold ${w.price.startsWith('$') ? 'text-[2.8rem] leading-none' : 'text-[1.6rem]'}`}>
                                {w.price} {w.unit && <span className={`text-base font-medium ${w.primary ? 'text-white/75' : 'text-muted'}`}>{w.unit}</span>}
                            </p>
                            <h3 className={`mt-5 text-xl ${w.primary ? 'text-white' : 'text-ink'}`}>{w.title}</h3>
                            <p className={`mt-2 flex-1 leading-relaxed ${w.primary ? 'text-white/80' : 'text-muted'}`}>{w.text}</p>
                            <Link to={w.to} className={`mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 font-bold transition-colors ${w.primary ? 'bg-white text-[var(--isnad-navy)] hover:bg-blue-soft' : 'bg-navy text-white hover:bg-black'}`}>
                                {w.cta}<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-center text-sm text-muted">Donations are made safely through PayPal.</p>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <>
            <Hero />
            <Numbers />
            <HowWeHelp />
            <Story />
            <WaysToHelp />
        </>
    );
}
