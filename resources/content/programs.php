<?php

/*
 * PROGRAMS — add a program by appending an item.
 * status: Past | Active | Planned
 * metrics: include ONLY verified figures.
 * To add a photo: put it in public/images/programs/ and set image.src.
 */

return [
    'program_status_description' => [
        'active' => 'Currently running',
        'planned' => 'Planned — seeking support',
        'past' => 'Completed',
    ],
    'programs' => [
        [
            'slug' => 'study-spaces',
            'title' => 'Student Study Spaces',
            'summary' => 'Free, shared spaces with electricity and internet where students can study and work.',
            'description' => 'Our founding program. ISNAD rents and runs shared study spaces that give students reliable power, internet access, and a calm environment for attending online lectures, researching, and completing coursework. The program has continued across five locations, adapting its size to the resources available.',
            'audience' => 'University students in Gaza who lack a stable place to study',
            'status' => 'Active',
            'icon' => 'building',
            'image' => [
                'src' => '/images/photos/study-space.jpg',
                'alt' => 'Students studying in an ISNAD space',
                'placeholder_label' => 'Photo: students in an ISNAD study space',
            ],
            'metrics' => [
                [
                    'value' => '~30',
                    'label' => 'students / month in the first space',
                ],
                [
                    'value' => '~15–20',
                    'label' => 'students / month in the smaller space',
                ],
            ],
        ],
        [
            'slug' => 'technical-workshops',
            'title' => 'Technical Skills Workshops',
            'summary' => 'Free, focused sessions on practical and digital skills.',
            'description' => 'Short, hands-on workshops — typically around three hours — designed to help students build practical and technical skills they can apply in their studies and in the job market. Workshops are free for participants.',
            'audience' => 'University students and recent graduates',
            'status' => 'Active',
            'icon' => 'laptop',
            'image' => [
                'alt' => 'A technical workshop at ISNAD',
                'placeholder_label' => 'Photo: a technical skills workshop',
            ],
            'metrics' => [
                [
                    'value' => '500+',
                    'label' => 'workshop & training participants (all sessions, approx.)',
                ],
            ],
        ],
        [
            'slug' => 'practical-training',
            'title' => 'Practical Training Programs',
            'summary' => 'Structured training that connects learning with real-world application.',
            'description' => 'Building on our workshops, ISNAD plans longer-format training programs that take students through a skill step by step, with practice and guidance along the way. Topics and formats will be shaped by student needs and partner expertise.',
            'audience' => 'Students and graduates seeking employable, practical skills',
            'status' => 'Planned',
            'icon' => 'wrench',
            'image' => [
                'alt' => 'Students in a practical training session',
                'placeholder_label' => 'Photo: practical training (planned program)',
            ],
        ],
        [
            'slug' => 'professional-development',
            'title' => 'Professional Development Activities',
            'summary' => 'Mentoring, networking and career-readiness for students and graduates.',
            'description' => 'Activities that connect students with graduates, freelancers, and professionals — to exchange experience, explore career paths, and build the confidence and networks that help young people move from study to work.',
            'audience' => 'Final-year students, graduates and early-career freelancers',
            'status' => 'Planned',
            'icon' => 'compass',
            'image' => [
                'alt' => 'A professional development session',
                'placeholder_label' => 'Photo: professional development (planned program)',
            ],
        ],
    ],
];
