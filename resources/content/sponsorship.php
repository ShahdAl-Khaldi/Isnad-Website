<?php

/*
 * SPONSORSHIP OPTIONS & PRICING — change amounts here; cards, calculator and buttons all update.
 * cost_breakdown: fill in once figures are verified, e.g. ['item' => 'Rent', 'share' => '40%'].
 */

return [
    'cost_breakdown' => [],
    'flexible_amounts' => [25, 50, 250, 500],
    'sponsorship_options' => [
        [
            'id' => 'study-space',
            'title' => 'Sponsor a Student’s Study Space',
            'short_title' => 'Monthly Student Sponsorship',
            'amount' => 100,
            'unit' => '/ month',
            'description' => 'Help a student in Gaza access a supportive learning environment for an entire month.',
            'details' => [
                'Supports one student’s access to an ISNAD study space for a month',
                'Contributes to the running costs that make the space usable, such as rent, electricity and internet',
                'Exact coverage per sponsorship will be confirmed and published',
            ],
            'cta' => 'Sponsor for $100',
            'icon' => 'building',
        ],
        [
            'id' => 'workshop-seat',
            'title' => 'Sponsor a Workshop Seat',
            'short_title' => 'Three-Hour Workshop Sponsorship',
            'amount' => 10,
            'unit' => '/ student',
            'description' => 'Help a student participate in a three-hour educational workshop designed to develop practical skills and expand learning opportunities.',
            'details' => [
                'Covers one student’s place in a three-hour workshop',
                'Workshops focus on practical, transferable skills',
                'Free for the student — your sponsorship makes that possible',
            ],
            'cta' => 'Sponsor for $10',
            'icon' => 'lightbulb',
        ],
    ],
    'support_allocation' => [
        [
            'title' => 'Study-space sponsorships',
            'body' => 'Keep a student connected to a working environment: space, power, connectivity, and the day-to-day operations that keep the doors open.',
            'icon' => 'building',
        ],
        [
            'title' => 'Workshop sponsorships',
            'body' => 'Fund a student’s seat in a practical session and the costs of running it, so the workshop stays free for participants.',
            'icon' => 'lightbulb',
        ],
        [
            'title' => 'General contributions',
            'body' => 'Are directed to where they are most needed across study spaces and training, as ISNAD works toward more stable, long-term programs.',
            'icon' => 'sprout',
        ],
    ],
];
