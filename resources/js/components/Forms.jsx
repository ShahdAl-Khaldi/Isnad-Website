import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Mail, MessageCircle } from 'lucide-react';
import { postJson } from '../lib/api';
import { validate } from '../lib/validate';
import { useContent, useSite } from '../lib/site';
import { emailHref } from '../lib/contact';
import { ArrowDot, pillClasses } from './PillButton';
import { cn } from '../lib/cn';

const control = (error) => cn(
    'w-full rounded-card border bg-paper px-5 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:outline-none focus:ring-4 focus:ring-navy/15',
    error ? 'border-status-error' : 'border-line focus:border-navy',
);

export function Field({ name, label, type = 'text', required, error, options, placeholder, hint, ...rest }) {
    const id = `f-${name}`;
    const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
    const common = { id, name, required, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, ...rest };
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
                {label}
                {required ? <span className="ms-1 text-blue-strong" aria-hidden="true">*</span> : <span className="ms-1.5 font-normal text-muted">(optional)</span>}
            </label>
            {type === 'textarea' ? (
                <textarea rows={6} placeholder={placeholder} className={cn(control(error), 'min-h-40 resize-y py-4')} {...common} />
            ) : type === 'select' ? (
                <div className="relative">
                    <select className={cn(control(error), 'h-14 appearance-none pe-12')} {...common}>
                        <option value="" disabled>{placeholder ?? 'Select…'}</option>
                        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute inset-y-0 end-5 my-auto size-4 text-muted" aria-hidden="true" />
                </div>
            ) : (
                <input type={type} placeholder={placeholder} className={cn(control(error), 'h-14')} {...common} />
            )}
            {error ? <p id={`${id}-error`} className="mt-2 text-sm text-status-error">{error}</p>
                : hint ? <p id={`${id}-hint`} className="mt-2 text-xs text-muted">{hint}</p> : null}
        </div>
    );
}

/** Submits to the Laravel API and reports the REAL outcome. */
function useForm(endpoint, rules) {
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const values = Object.fromEntries(new FormData(form).entries());
        const clientErrors = validate(rules, values);
        if (Object.keys(clientErrors).length) {
            setErrors(clientErrors);
            setStatus('error');
            setMessage('Please check the highlighted fields.');
            form.querySelector(`[name="${Object.keys(clientErrors)[0]}"]`)?.focus();
            return;
        }
        setErrors({});
        setStatus('sending');
        const res = await postJson(endpoint, values);
        if (res.ok) {
            setStatus('success');
            setMessage(res.message);
            form.reset();
            return;
        }
        setErrors(res.errors ?? {});
        setStatus('error');
        setMessage(res.message);
        if (res.errors) form.querySelector(`[name="${Object.keys(res.errors)[0]}"]`)?.focus();
    }

    return { status, errors, message, onSubmit, reset: () => { setStatus('idle'); setMessage(''); setErrors({}); } };
}

function Honeypot() {
    return (
        <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
            <label>Leave this field empty <input type="text" name="company_url" tabIndex={-1} autoComplete="off" /></label>
        </div>
    );
}

function Submit({ status, children }) {
    const sending = status === 'sending';
    return (
        <button type="submit" disabled={sending} aria-busy={sending} className={pillClasses('blue', 'lg', 'w-full sm:w-auto disabled:opacity-70')}>
            <span>{sending ? 'Sending…' : children}</span>
            {sending
                ? <span className="flex size-11 items-center justify-center"><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /></span>
                : <ArrowDot size="lg" />}
        </button>
    );
}

function DirectContact() {
    const { site } = useSite();
    const { email, whatsapp } = site.contact;
    return (
        <span className="mt-2 flex flex-wrap gap-4">
            {email && <a href={emailHref(email)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"><Mail className="size-4" aria-hidden="true" />{email}</a>}
            {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a>}
        </span>
    );
}

function Feedback({ status, message }) {
    if (status !== 'error' || !message) return null;
    return (
        <div role="alert" className="flex gap-3 rounded-card border border-status-error/30 bg-status-error/5 p-4 text-sm text-ink">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-status-error" aria-hidden="true" />
            <div>
                <p>{message}</p>
                {!message.startsWith('Please check') && <DirectContact />}
            </div>
        </div>
    );
}

function Success({ title, message, onReset }) {
    return (
        <div role="status" className="rounded-card-lg border border-status-success/25 bg-status-success/5 p-8 text-center md:p-14">
            <CircleCheck className="mx-auto size-12 text-status-success" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-6 text-2xl text-ink">{title}</h3>
            <p className="mx-auto mt-3 max-w-md text-muted">{message}</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">Connectivity in Gaza can be unpredictable, so please allow a few days for our reply.</p>
            <button type="button" onClick={onReset} className="mt-8 text-sm font-semibold text-blue-strong underline underline-offset-4">Send another message</button>
        </div>
    );
}

const partnerRules = {
    organization: { label: 'your organization’s name', required: true, max: 200 },
    contact_name: { label: 'a contact person', required: true, max: 120 },
    email: { label: 'your work email', required: true, email: true, max: 200 },
    country: { label: 'your country', required: true, max: 100 },
    website: { label: 'a website', url: true, max: 300 },
    interest: { label: 'a partnership interest', required: true },
    message: { label: 'a message', required: true, min: 20, max: 5000 },
};

export function PartnerForm() {
    const interests = useContent('partnership').partnership_interest_options ?? [];
    const { status, errors, message, onSubmit, reset } = useForm('/api/inquiries/partner', partnerRules);
    if (status === 'success') return <Success title="Thank you — your inquiry is in." message={message} onReset={reset} />;
    return (
        <form noValidate onSubmit={onSubmit} className="relative space-y-6">
            <Honeypot />
            <div className="grid gap-6 sm:grid-cols-2">
                <Field name="organization" label="Organization name" required autoComplete="organization" maxLength={200} error={errors.organization} />
                <Field name="contact_name" label="Contact person" required autoComplete="name" maxLength={120} error={errors.contact_name} />
                <Field name="email" type="email" label="Work email" required autoComplete="email" maxLength={200} error={errors.email} />
                <Field name="country" label="Country" required autoComplete="country-name" maxLength={100} error={errors.country} />
                <Field name="website" inputMode="url" label="Organization website" placeholder="example.org" autoComplete="url" maxLength={300} error={errors.website} />
                <Field name="interest" type="select" label="Partnership interest" required defaultValue="" options={interests.map((v) => ({ value: v, label: v }))} error={errors.interest} />
            </div>
            <Field name="message" type="textarea" label="Message" required maxLength={5000} error={errors.message}
                placeholder="Tell us about your organization and the kind of partnership you have in mind." />
            <Feedback status={status} message={message} />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">We use your details only to respond to your inquiry. See our <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.</p>
                <Submit status={status}>Send inquiry</Submit>
            </div>
        </form>
    );
}

const contactRules = {
    name: { label: 'your name', required: true, max: 120 },
    email: { label: 'your email', required: true, email: true, max: 200 },
    topic: { label: 'a topic', required: true },
    organization: { label: 'an organization', max: 200 },
    message: { label: 'a message', required: true, min: 10, max: 5000 },
};

export function ContactForm({ defaultTopic = '' }) {
    const topics = useContent('contact').contact_topics ?? [];
    const { status, errors, message, onSubmit, reset } = useForm('/api/inquiries/contact', contactRules);
    if (status === 'success') return <Success title="Thank you — your message is in." message={message} onReset={reset} />;
    return (
        <form noValidate onSubmit={onSubmit} className="relative space-y-6">
            <Honeypot />
            <div className="grid gap-6 sm:grid-cols-2">
                <Field name="name" label="Your name" required autoComplete="name" maxLength={120} error={errors.name} />
                <Field name="email" type="email" label="Your email" required autoComplete="email" maxLength={200} error={errors.email} />
                <Field key={defaultTopic} name="topic" type="select" label="Topic" required defaultValue={defaultTopic} options={topics} error={errors.topic} />
                <Field name="organization" label="Organization" autoComplete="organization" maxLength={200} error={errors.organization} />
            </div>
            <Field name="message" type="textarea" label="Message" required maxLength={5000} placeholder="How can we help?" error={errors.message} />
            <Feedback status={status} message={message} />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">We use your details only to reply. See our <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.</p>
                <Submit status={status}>Send message</Submit>
            </div>
        </form>
    );
}
