<?php

/*
 * GALLERY — authentic ISNAD photos only.
 * 1. Put photos in public/images/gallery/
 * 2. Add 'src' => '/images/gallery/workshop-01.jpg' to the item's image, with a descriptive alt.
 * Items without src show as clearly labelled placeholders.
 * category: Study spaces | Workshops | Team | Previous locations | Events
 */

return [
    'gallery' => [
        [
            'id' => 'g1',
            'category' => 'Study spaces',
            'caption' => 'Students working in an ISNAD study space',
            'image' => [
                'src' => '/images/photos/study-space.jpg',
                'alt' => 'Students studying at ISNAD',
                'placeholder_label' => 'Students in a study space',
            ],
        ],
        [
            'id' => 'g2',
            'category' => 'Workshops',
            'caption' => 'A practical skills workshop',
            'image' => [
                'alt' => 'An ISNAD workshop',
                'placeholder_label' => 'Workshop session',
            ],
        ],
        [
            'id' => 'g3',
            'category' => 'Study spaces',
            'caption' => 'A student coding at ISNAD',
            'image' => [
                'src' => '/images/photos/student-coding.jpg',
                'alt' => 'A student coding on a laptop with an ISNAD sticker',
                'placeholder_label' => 'Student coding',
            ],
        ],
        [
            'id' => 'g4',
            'category' => 'Previous locations',
            'caption' => 'Our first study space',
            'image' => [
                'alt' => 'ISNAD\'s first location',
                'placeholder_label' => 'First location',
            ],
        ],
        [
            'id' => 'g5',
            'category' => 'Events',
            'caption' => 'A community gathering of students and professionals',
            'image' => [
                'alt' => 'An ISNAD community event',
                'placeholder_label' => 'Educational event',
            ],
        ],
        [
            'id' => 'g6',
            'category' => 'Study spaces',
            'caption' => 'Power and connectivity for coursework',
            'image' => [
                'src' => '/images/photos/laptop-sticker.jpg',
                'alt' => 'Students using power and internet',
                'placeholder_label' => 'Power & internet access',
            ],
        ],
    ],
];
