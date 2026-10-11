<?php

/*
 * NAVIGATION — header and footer links (route names are defined in routes/web.php).
 */

return [
    'footer_nav' => [
        'organization' => [
            [
                'href' => '/our-story',
                'label' => 'Our Story',
            ],
            [
                'href' => '/impact',
                'label' => 'Our Impact',
            ],
            [
                'href' => '/programs',
                'label' => 'Programs',
            ],
            [
                'href' => '/updates',
                'label' => 'Gallery & Updates',
            ],
        ],
        'get_involved' => [
            [
                'href' => '/sponsor',
                'label' => 'Sponsor a Student',
            ],
            [
                'href' => '/partner',
                'label' => 'Partner With Us',
            ],
            [
                'href' => '/contact',
                'label' => 'Contact',
            ],
            [
                'href' => '/privacy',
                'label' => 'Privacy Policy',
            ],
        ],
    ],
    'main_nav' => [
        ['href' => '/', 'label' => 'Home'],
        ['href' => '/about', 'label' => 'About'],
        ['href' => '/sponsor', 'label' => 'Partner'],
        ['href' => '/contact', 'label' => 'Contact'],
    ],
    'sponsor_nav_item' => [
        'href' => '/sponsor',
        'label' => 'Sponsor a Student',
    ],
];
