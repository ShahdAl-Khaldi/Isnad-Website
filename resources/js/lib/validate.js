/** Client-side checks that mirror the Laravel FormRequests (the server re-checks everything). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(rules, values) {
    const errors = {};
    for (const [name, rule] of Object.entries(rules)) {
        const v = String(values[name] ?? '').trim();
        if (rule.required && !v) { errors[name] = `Please enter ${rule.label}.`; continue; }
        if (!v) continue;
        if (rule.email && !EMAIL_RE.test(v)) errors[name] = 'Please enter a valid email address.';
        if (rule.url) {
            try {
                const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
                if (!u.hostname.includes('.')) throw new Error();
            } catch { errors[name] = 'Please enter a valid website address.'; }
        }
        if (rule.min && v.length < rule.min) errors[name] = `Please write at least ${rule.min} characters.`;
        if (rule.max && v.length > rule.max) errors[name] = `Please keep this under ${rule.max} characters.`;
    }
    return errors;
}
