import { Link } from 'react-router';
import { ArrowRight, Phone } from 'lucide-react';
import { SocialIcons } from './SocialIcons';
import { useSite } from '../lib/site';
import { emailHref } from '../lib/contact';

/**
 * Footer in the style of the original ISNAD site:
 * logo · "Contact us on WhatsApp" pill · social icons + copyright · Palestine + phone.
 */
export function Footer() {
    const { site } = useSite();
    const { phone, whatsapp, email } = site.contact;
    const contactHref = whatsapp ? `https://wa.me/${whatsapp}` : email ? emailHref(email) : '/contact';
    const external = contactHref.startsWith('http');
    const logo = site.logo.src_on_dark || site.logo.src;

    return (
        <footer className="bg-black text-white/55">
            <div className="container-page py-12 md:py-16">
                <Link to="/" aria-label={`${site.name} — home`} className="inline-block">
                    {logo
                        ? <img src={logo} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} className="h-5 w-auto md:h-6" />
                        : <span className="text-2xl font-medium text-white">{site.name}</span>}
                </Link>

                <p className="mt-5 text-sm">{whatsapp ? 'Contact us on WhatsApp:' : 'Contact us:'}</p>

                <a href={contactHref} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group mt-4 flex h-12 w-full max-w-[16rem] items-center justify-between rounded-pill bg-[#1d1d1d] ps-6 pe-2 transition-colors duration-300 hover:bg-[#262626]">
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase transition-colors group-hover:text-white">Contact us</span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-blue text-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45" aria-hidden="true">
                        <ArrowRight className="size-4 rtl:-scale-x-100" strokeWidth={2.2} />
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div>
                        <SocialIcons />
                        <p className="mt-4 text-sm">
                            © Copyright {new Date().getFullYear()} - {site.name} All Rights Reserved.
                        </p>
                        <Link to="/privacy" className="mt-1 inline-block text-xs text-white/40 transition-colors hover:text-white">Privacy Policy</Link>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold tracking-normal text-white">Palestine</h2>
                        {phone && (
                            <p className="mt-3 flex items-center gap-2 text-sm">
                                <Phone className="size-4 fill-current" aria-hidden="true" />
                                <span>:</span>
                                <a href={whatsapp ? `https://wa.me/${whatsapp}` : `tel:${phone.replace(/[\s-]/g, '')}`} target={whatsapp ? '_blank' : undefined} rel={whatsapp ? 'noopener noreferrer' : undefined} dir="ltr" className="transition-colors hover:text-white">{phone}</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
