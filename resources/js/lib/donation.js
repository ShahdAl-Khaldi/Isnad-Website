/**
 * PayPal links. ISNAD never collects payment details — visitors complete
 * their gift on PayPal. Returns null when no link is configured.
 */
export function formatMoney(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
}

export function donationUrl(donation, amount, itemName) {
    if (!donation?.url || !/^https:\/\//i.test(donation.url)) return null;
    const u = new URL(donation.url);
    if (donation.appendAmount) {
        if (amount > 0) {
            u.searchParams.set('amount', String(Math.round(amount * 100) / 100));
            u.searchParams.set('currency_code', donation.currency || 'USD');
        }
        if (itemName) u.searchParams.set('item_name', itemName);
    }
    return u.toString();
}

export function donationHint(donation, amount) {
    if (amount && !donation?.appendAmount) {
        return `You’ll enter ${formatMoney(amount, donation?.currency)} and complete your gift securely on PayPal.`;
    }
    return 'You’ll complete your gift securely on PayPal.';
}
