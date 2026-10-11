<?php

namespace App\Support;

/**
 * Everything the React front end needs, gathered in one place.
 * Served at GET /api/content and embedded in the page for an instant first render.
 * Only public information goes here — never secrets from .env.
 */
class SiteData
{
    private const CONTENT_FILES = [
        'navigation', 'home', 'impact', 'timeline', 'programs', 'services', 'sponsorship',
        'partnership', 'testimonials', 'gallery', 'updates', 'reports', 'contact',
    ];

    public static function all(): array
    {
        $content = [];
        foreach (self::CONTENT_FILES as $file) {
            $content[$file] = Content::get($file);
        }

        return [
            'site' => [
                'name' => config('isnad.name'),
                'nameArabic' => config('isnad.name_arabic'),
                'tagline' => config('isnad.tagline'),
                'location' => config('isnad.location'),
                'description' => config('isnad.description'),
                'mission' => config('isnad.mission'),
                'contact' => config('isnad.contact'),
                'social' => array_filter(config('isnad.social', [])),
                'logo' => config('isnad.logo'),
            ],
            'donation' => [
                'url' => Donation::configured() ? config('isnad.donation.paypal_url') : '',
                'appendAmount' => (bool) config('isnad.donation.append_amount'),
                'currency' => config('isnad.donation.currency'),
                'currencySymbol' => config('isnad.donation.currency_symbol'),
            ],
            'content' => $content,
        ];
    }
}
