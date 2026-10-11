<?php

/*
|--------------------------------------------------------------------------
| ISNAD — SITE CONFIGURATION
|--------------------------------------------------------------------------
| Organisation details, contact info, social links, logo and donations.
| Values marked env(...) are best set in your .env file.
| Anything left empty ("") is shown on the site as "To be provided" /
| "Coming soon" — never as a broken link.
*/

return [

    'name' => 'ISNAD',
    'name_arabic' => 'إسناد',
    'tagline' => 'Gaza Student Support Initiative',
    'location' => 'Gaza, Palestine',
    'description' => 'ISNAD is a student-support initiative in Gaza, Palestine, providing accessible study spaces, essential resources, practical training and a supportive learning community.',
    'mission' => 'Supporting students in Gaza with accessible learning environments, essential study resources, practical training, and opportunities for personal and professional growth.',

    'contact' => [
        'email' => env('ISNAD_CONTACT_EMAIL', 'isnadgazaeducation@gmail.com'),       // e.g. hello@isnad.org
        'phone' => env('ISNAD_CONTACT_PHONE', '+970 56-635-2949'),       // e.g. +970 59 000 0000
        // WhatsApp number in international format, digits only, no "+" (e.g. 970590000000)
        'whatsapp' => env('ISNAD_WHATSAPP', '970566352949'),
    ],

    // Leave empty to hide an icon.
    'social' => [
        'instagram' => env('ISNAD_INSTAGRAM_URL', 'https://www.instagram.com/isnad.ps'),
        'facebook' => env('ISNAD_FACEBOOK_URL', ''),
        'linkedin' => env('ISNAD_LINKEDIN_URL', 'https://www.linkedin.com/company/isnadgaza'),
        'x' => env('ISNAD_X_URL', ''),
    ],

    /*
    | Logo — files live in public/images/brand/. Replace them to update the logo.
    */
    'logo' => [
        'src' => '/images/brand/isnad-logo.svg',           // navy, for light backgrounds
        'src_on_dark' => '/images/brand/isnad-logo-white.svg', // white, for dark backgrounds
        'alt' => 'ISNAD — إسناد',
        'width' => 1604,
        'height' => 394,
    ],

    'donation' => [
        // PAYPAL_DONATION_URL — e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
        'paypal_url' => env('PAYPAL_DONATION_URL', 'https://www.paypal.com/donate/?hosted_button_id=LRRJ2ASN8ULU2'),
        // Set true ONLY if your link accepts ?amount=… (e.g. https://www.paypal.com/donate?business=you@example.org)
        'append_amount' => (bool) env('PAYPAL_APPEND_AMOUNT', false),
        'currency' => 'USD',
        'currency_symbol' => '$',
    ],

    'forms' => [
        // Every contact/partnership message is saved in the database (table: inquiries).
        // If set, a copy is also emailed here (configure MAIL_* in .env).
        'notify_email' => env('ISNAD_FORMS_NOTIFY_EMAIL', ''),
    ],

    // Language setup. English is primary; layouts are RTL-ready.
    'locales' => [
        'en' => ['label' => 'English', 'dir' => 'ltr'],
        'ar' => ['label' => 'العربية', 'dir' => 'rtl'],
    ],
];
