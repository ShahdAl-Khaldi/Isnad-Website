<?php

/*
 * HOMEPAGE — images and short lists used on the homepage.
 * To use a real photo: put it in public/images/hero/ (or story/) and set 'src'.
 */

return [
    'hero_image' => [
        'src' => '/images/photos/isnad-hero.jpg',
        'alt' => 'Students working on laptops in an ISNAD study space in Gaza',
        'caption' => 'Students at an ISNAD study space in Gaza',
        'placeholder_label' => 'Hero photo: students studying in an ISNAD space',
    ],

    'story_image' => [
        'src' => '/images/photos/story-laptop.jpg',
        'alt' => 'A student coding on a laptop with an ISNAD sticker',
        'placeholder_label' => "Photo: ISNAD's first study space",
    ],

    // Optional: several photos for the homepage "Our story" box (they rotate automatically).
    // 'story_images' => [
    //     ['src' => '/images/photos/story-laptop.jpg', 'alt' => '...'],
    //     ['src' => '/images/photos/another-photo.jpg', 'alt' => '...'],
    // ],

    // The five locations, in order.
    // Figures are monthly capacity during each period — never add them together.
    'rooms' => [
        ['name' => 'The first room', 'period' => 'About two months', 'capacity' => '~30', 'unit' => 'students a month', 'note' => 'A small rented space with power and internet, free for students — about 15 women and 15 men each month.', 'state' => 'past'],
        ['name' => 'A larger room', 'period' => 'About two months', 'capacity' => '~32–35', 'unit' => 'students a month', 'note' => 'Demand grew, so we moved into a larger space for more students.', 'state' => 'lost', 'lost_note' => 'Later destroyed in an attack.'],
        ['name' => 'Starting again', 'period' => 'After relocating', 'capacity' => '~32', 'unit' => 'students a month', 'note' => 'We relocated and resumed both study-space access and training.', 'state' => 'past'],
        ['name' => 'A smaller space', 'period' => 'After moving again', 'capacity' => '~15–20', 'unit' => 'students a month', 'note' => 'A smaller space, adapted to the resources we had — still open, still free.', 'state' => 'past'],
        ['name' => 'Today', 'period' => 'Current space', 'capacity' => '', 'unit' => '', 'note' => 'A larger flat with a training room for courses and a separate workspace for students.', 'state' => 'current'],
    ],

    'story_steps' => [
        ['k' => '01', 'title' => 'A free study space', 'body' => 'One rented room with power and internet, open to students at no cost.'],
        ['k' => '02', 'title' => 'Room to grow', 'body' => 'A larger space as more students came looking for a place to work.'],
        ['k' => '03', 'title' => 'Skills and community', 'body' => 'Free workshops and training, joined by 500+ participants.'],
        ['k' => '04', 'title' => 'Starting again', 'body' => 'After losing a location to an attack, we relocated and carried on.'],
    ],

    'partner_areas' => [
        ['icon' => 'building', 'title' => 'Learning environments'],
        ['icon' => 'laptop', 'title' => 'Equipment & connectivity'],
        ['icon' => 'lightbulb', 'title' => 'Workshops & training'],
        ['icon' => 'layers', 'title' => 'Program co-design'],
    ],

    // Impact page: what the numbers stand for.
    'historical_impact' => [
        ['icon' => 'building', 'title' => 'Student study-space access', 'body' => 'Across our locations, ISNAD’s spaces have supported between roughly 15 and 35 students each month, depending on the size of the space and the resources available at the time.'],
        ['icon' => 'lightbulb', 'title' => 'Free workshops & training', 'body' => 'Approximately 500 or more students have taken part in free workshops and practical training sessions — counted separately from study-space access.'],
        ['icon' => 'map', 'title' => 'Locations and relocations', 'body' => 'We have operated in five locations. When our second location was destroyed in an attack, we relocated and resumed support rather than stopping.'],
        ['icon' => 'sprout', 'title' => 'Skills and learning opportunities', 'body' => 'Beyond access, students have gained practical skills and a community of peers, graduates and professionals to learn from.'],
    ],

    // Sponsor page: how giving works.
    'how_giving_works' => [
        ['icon' => 'pointer', 'title' => 'Choose your sponsorship', 'body' => 'Pick a study-space month, a workshop seat, or any amount — or use the calculator to plan a larger gift.'],
        ['icon' => 'external', 'title' => 'Complete it on PayPal', 'body' => 'You’ll be taken to PayPal’s secure page. ISNAD never sees or stores your card details.'],
        ['icon' => 'receipt', 'title' => 'Get PayPal’s confirmation', 'body' => 'Your gift is complete only once PayPal confirms it. PayPal sends the receipt to your email.'],
    ],
];
