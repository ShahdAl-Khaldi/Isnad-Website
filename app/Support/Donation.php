<?php

namespace App\Support;

/**
 * Builds the external PayPal URL. ISNAD never collects payment details:
 * visitors complete their gift on PayPal. Returns null when no link is configured.
 */
class Donation
{
    public static function configured(): bool
    {
        return (bool) preg_match('#^https://#i', (string) config('isnad.donation.paypal_url'));
    }

    public static function url(?float $amount = null, ?string $itemName = null): ?string
    {
        if (! self::configured()) {
            return null;
        }

        $url = (string) config('isnad.donation.paypal_url');

        if (! config('isnad.donation.append_amount')) {
            return $url;
        }

        $params = [];
        if ($amount && $amount > 0) {
            $params['amount'] = round($amount, 2);
            $params['currency_code'] = config('isnad.donation.currency');
        }
        if ($itemName) {
            $params['item_name'] = $itemName;
        }

        if ($params === []) {
            return $url;
        }

        return $url.(str_contains($url, '?') ? '&' : '?').http_build_query($params);
    }

    public static function money(float|int $amount): string
    {
        $symbol = config('isnad.donation.currency_symbol', '$');
        $formatted = fmod((float) $amount, 1.0) === 0.0
            ? number_format($amount)
            : number_format($amount, 2);

        return $symbol.$formatted;
    }
}
