/**
 * POST JSON to the Laravel API and normalise every outcome so the forms can
 * show an honest result: success only when the server confirms it stored the message.
 * Returns { ok, message, errors }.
 */
export async function postJson(url, body) {
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            body: JSON.stringify(body),
        });
    } catch {
        return { ok: false, message: 'We couldn’t reach the server. Please check your connection and try again.' };
    }

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) return { ok: true, message: data.message };

    if (res.status === 422) {
        const errors = Object.fromEntries(Object.entries(data.errors ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
        return { ok: false, message: 'Please check the highlighted fields.', errors };
    }
    if (res.status === 429) {
        return { ok: false, message: 'Too many attempts in a short time. Please wait a minute and try again.' };
    }
    return { ok: false, message: data.message || 'Something went wrong. Please try again in a few minutes.' };
}
