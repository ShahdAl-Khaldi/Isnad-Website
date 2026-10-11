<?php

/*
 * THE ISNAD STORY — timeline for /our-story.
 * Durations and numbers are intentionally approximate.
 * PHOTOS — put files in public/images/story/.
 *  One photo:      'image'  => ['src' => '/images/story/first-room.jpg', 'alt' => 'Describe the photo'],
 *  Several photos: 'images' => [
 *                      ['src' => '/images/story/first-room-1.jpg', 'alt' => '...'],
 *                      ['src' => '/images/story/first-room-2.jpg', 'alt' => '...'],
 *                  ],
 *  Several photos change automatically every few seconds.
 * tone: default | loss | future
 */

return [
    'story_closing' => [
        'title' => 'Our Locations Changed. Our Mission Never Did.',
        'body' => 'Every move asked us to start again with less. Each time, students came back — and so did we. What we want to build next is something that doesn\'t have to start over.',
    ],
    'story_intro' => [
        'eyebrow' => 'Our Story',
        'title' => 'A small room, a reliable connection, and a place to keep going.',
        'lead' => 'ISNAD began about a year ago with a simple question: where can a university student in Gaza actually study right now? This is the story of how one shared space became a student-support initiative — and how it kept going when the spaces themselves did not.',
    ],
    'timeline' => [
        [
            'id' => 'challenge',
            'marker' => 'The context',
            'title' => 'Students with the will to learn, but nowhere to do it',
            'body' => [
                'For university students in Gaza, the ongoing conflict has made the basics of studying uncertain. Electricity is unreliable. Internet access is limited. Many students have been displaced from their homes, and safe, quiet places to read, attend online lectures, or finish an assignment are hard to find.',
                'Students were still enrolled and still determined — but the conditions for learning had largely disappeared. ISNAD was started to address exactly that gap.',
            ],
            'image' => [
                'src' => '/images/story/context-coding.jpg',
                'alt' => 'A student coding on a laptop with an ISNAD sticker',
            ],
        ],
        [
            'id' => 'first-space',
            'marker' => 'Phase 1',
            'title' => 'Opening our first free study space',
            'period' => 'About two months',
            'body' => [
                'We rented a small location and opened it to students free of charge: electricity, internet, and a calm, productive place to work.',
                'The space supported approximately 30 students each month — around 15 women and 15 men — over roughly two months.',
            ],
            'highlights' => [
                '~30 students per month',
                'Free of charge',
                'Electricity & internet',
            ],
            'images' => [
                ['src' => '/images/story/first-space-1.jpg', 'alt' => 'Students working on laptops in an ISNAD study space'],
                ['src' => '/images/story/first-space-2.jpg', 'alt' => 'A student studying on a laptop with an ISNAD sticker'],
                ['src' => '/images/story/first-space-3.jpg', 'alt' => 'A student coding a web design project'],
            ],
        ],
        [
            'id' => 'expansion',
            'marker' => 'Phase 2',
            'title' => 'Moving to a larger space as demand grew',
            'period' => 'About two months',
            'body' => [
                'Word spread, and more students needed a place to work than our first room could hold. We moved into a larger location.',
                'The new space accommodated approximately 32–35 students during its operating period, which lasted around two months.',
            ],
            'highlights' => [
                '~32–35 students per month',
                'Larger shared space',
            ],
            'images' => [
                ['src' => '/images/story/expansion-1.jpg', 'alt' => 'Students working on laptops in ISNAD\'s second, larger space'],
                ['src' => '/images/story/expansion-2.jpg', 'alt' => 'A student working on a design project on a laptop'],
                ['src' => '/images/story/expansion-3.jpg', 'alt' => 'Students at ISNAD working at their desks'],
                ['src' => '/images/story/expansion-4.jpg', 'alt' => 'A group of students working together at ISNAD'],
            ],
        ],
        [
            'id' => 'workshops',
            'marker' => 'Phase 3',
            'title' => 'Going beyond study spaces',
            'body' => [
                'Spending time with students made something clear: they needed more than a desk and a connection. They wanted practical skills, guidance, and a sense of progress.',
                'We began offering free educational workshops, practical training sessions, and skill-development activities. Approximately 500 or more students took part. ISNAD grew from a study space into an educational community.',
            ],
            'highlights' => [
                '500+ workshop & training participants',
                'Free of charge',
            ],
            'images' => [
                ['src' => '/images/story/workshop-1.jpg', 'alt' => 'A trainer leading a workshop session for ISNAD students'],
                ['src' => '/images/story/workshop-2.jpg', 'alt' => 'A trainer showing a design project on screen during an ISNAD workshop'],
            ],
        ],
        [
            'id' => 'loss',
            'marker' => 'Phase 4',
            'title' => 'Losing our second location',
            'tone' => 'loss',
            'body' => [
                'During the conflict, our second location was damaged in an attack and could no longer be used.',
                'We lost the space, but not the purpose behind it. We focused on what could still be done for the students who relied on us.',
            ],
            'image' => [
                'src' => '/images/story/loss.jpg',
                'alt' => 'The damaged second ISNAD location at night after the attack',
            ],
        ],
        [
            'id' => 'relocation',
            'marker' => 'Phase 5',
            'title' => 'Relocating, and continuing',
            'body' => [
                'We relocated and resumed both study-space access and training. At this location, we supported approximately 32 students each month during its operating period.',
            ],
            'highlights' => [
                '~32 students per month after relocating',
            ],
            'images' => [
                ['src' => '/images/story/relocation-1.jpg', 'alt' => 'Students working on laptops at ISNAD\'s relocated space'],
                ['src' => '/images/story/relocation-2.jpg', 'alt' => 'A student working on a laptop at ISNAD'],
                ['src' => '/images/story/relocation-3.jpg', 'alt' => 'Students working on laptops at ISNAD'],
                ['src' => '/images/story/relocation-4.jpg', 'alt' => 'Women students working on laptops at ISNAD'],
                ['src' => '/images/story/relocation-5.jpg', 'alt' => 'Students working on laptops at ISNAD'],
            ],
        ],
        [
            'id' => 'new-flat',
            'marker' => 'Phase 6',
            'title' => 'A bigger home, with room to grow',
            'body' => [
                'We then moved into a larger flat — our current home. For the first time, we have two dedicated rooms: one for courses and workshops, and one that gives students a quiet workspace to study and work.',
                'Having separate spaces means training and everyday studying can happen at the same time, without one crowding out the other.',
            ],
            'highlights' => [
                'Training room for courses and workshops',
                'Dedicated student workspace',
            ],
            'images' => [
                ['src' => '/images/story/new-flat-1.jpg', 'alt' => 'ISNAD\'s current space, with a training room and a student workspace'],
                ['src' => '/images/story/new-flat-2.jpg', 'alt' => 'Students working on laptops at ISNAD\'s current space'],
                ['src' => '/images/story/new-flat-3.jpg', 'alt' => 'A student writing notes at ISNAD'],
                ['src' => '/images/story/new-flat-4.jpg', 'alt' => 'Students working at ISNAD'],
                ['src' => '/images/story/new-flat-5.jpg', 'alt' => 'Students in a training session at ISNAD'],
                ['src' => '/images/story/new-flat-6.jpg', 'alt' => 'A trainer leading a workshop at ISNAD'],
                ['src' => '/images/story/new-flat-7.jpg', 'alt' => 'Students attending a training session at ISNAD'],
            ],
        ],
        [
            'id' => 'next',
            'marker' => 'Next chapter',
            'title' => 'From temporary solutions to lasting opportunity',
            'tone' => 'future',
            'body' => [
                'Our goal now is to move beyond temporary arrangements. We plan to build sustainable student-support programs: stable and accessible learning spaces, regular practical workshops, and long-term partnerships with organizations that share our commitment to education.',
                'These are plans, not yet achievements — and they are where support can make the greatest difference.',
            ],
            'highlights' => [
                'Sustainable study spaces (planned)',
                'Regular workshop programs (planned)',
                'Institutional partnerships (sought)',
            ],
        ],
    ],
];
