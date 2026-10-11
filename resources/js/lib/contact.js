/**
 * Gmail's web compose URL — used instead of mailto: so the link always opens
 * somewhere useful. A bare mailto: link silently fails (or opens nothing) on
 * any device without a default mail app configured, which is common.
 */
export function emailHref(email, subject) {
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: email });
    if (subject) params.set('su', subject);
    return `https://mail.google.com/mail/?${params.toString()}`;
}
