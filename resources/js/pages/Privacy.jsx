import { useSite } from '../lib/site';
import { PageHero } from '../components/PageHero';

/* ⚠ Template policy — review with a qualified advisor before launch, and update the date. */
const sections = (email) => [
    ['What we collect', 'When you use our contact or partnership forms, we receive and store the details you choose to provide — such as your name, email address, organization, country and message. We do not ask for or store payment card details.'],
    ['Donations', 'Donations are processed by PayPal on PayPal’s own website. Your payment details are handled under PayPal’s privacy policy; ISNAD does not receive your card information. PayPal may share basic donor information with us (for example, your name, email and gift amount) so we can acknowledge your support.'],
    ['How we use it', 'We use the information you share only to respond to you, follow up on sponsorship or partnership discussions, and keep appropriate records. We do not sell or rent your information.'],
    ['Service providers', 'Form messages are stored on our web server and may be delivered by an email provider. The site is hosted by a web-hosting provider. They process data only to provide those services.'],
    ['Students’ privacy', 'We publish photographs and stories of students only with their informed consent, and we respect their choices about how they are identified.'],
    ['Your choices', `You can ask us to access, correct or delete the information you’ve shared with us by writing to ${email}.`],
];

export default function Privacy() {
    const { site } = useSite();
    return (
        <>
            <PageHero eyebrow="Privacy Policy" title="Your information, handled with care." lead="Last updated: [date to be confirmed]" />
            <section className="bg-paper py-20 md:py-24">
                <div className="container-page max-w-3xl">
                    <ul className="divide-y divide-line border-y border-line">
                        {sections(site.contact.email || '[contact email to be provided]').map(([h, p], i) => (
                            <li key={h} className="grid gap-x-6 gap-y-3 py-10 sm:grid-cols-[3.5rem_1fr]">
                                <span className="text-sm font-bold tracking-wide text-blue-strong tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <h2 className="text-xl font-semibold text-ink md:text-2xl">{h}</h2>
                                    <p className="mt-3 leading-relaxed text-muted">{p}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
