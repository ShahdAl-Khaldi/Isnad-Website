import { ArrowLink, PillButton } from '../components/PillButton';

export default function NotFound() {
    return (
        <section className="on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-black text-inverse">
            <div className="container-page relative">
                <p className="mb-6 text-inverse-muted">Error 404</p>
                <h1 className="display max-w-3xl text-[3.4rem] text-white md:text-[6rem]">This page has moved — or never existed.</h1>
                <p className="mt-6 max-w-lg text-lg text-inverse-muted">The link may be out of date. Let’s get you back on track.</p>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                    <PillButton to="/" size="lg">Back to home</PillButton>
                    <ArrowLink to="/contact" light>Contact us</ArrowLink>
                </div>
            </div>
        </section>
    );
}
