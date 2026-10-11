import { Link } from 'react-router';

/**
 * Closing box: one centered card in the middle of the page.
 * Used at the end of the About page.
 */
export function CtaBand({
    title = 'Our locations changed. Our mission never did.',
    body = 'Every move asked us to start again with less. Each time, students came back — and so did we. Help us build something that doesn’t have to start over.',
}) {
    return (
        <section aria-labelledby="cta-title" className="bg-soft px-5 py-20 md:py-28">
            <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-navy px-6 py-14 text-center shadow-[0_20px_30px_-8px_rgb(17_51_86/0.35),0_45px_80px_-20px_rgb(17_51_86/0.55)] transition-transform duration-300 ease-out hover:-translate-y-6 hover:scale-[1.03] sm:px-12 md:py-16">
                <h2 id="cta-title" className="display mx-auto max-w-xl text-[1.9rem] text-white md:text-[2.6rem]">{title}</h2>
                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/80">{body}</p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link to="/sponsor" className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-7 font-bold text-[var(--isnad-navy)] transition-colors hover:bg-blue-soft">
                        Sponsor a student
                    </Link>
                    <Link to="/contact?topic=partnership" className="inline-flex h-12 items-center justify-center rounded-sm border-2 border-white/60 px-7 font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                        Partner with us
                    </Link>
                </div>
            </div>
        </section>
    );
}
