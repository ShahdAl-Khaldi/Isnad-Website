<?php

/*
 * ISNAD IMPACT FIGURES — every metric on the site reads from here.
 *
 * Accuracy rules:
 *  - Monthly figures are CAPACITY during a period. Never add them together —
 *    the same student may have attended in several periods.
 *  - Workshop participation is counted separately from study-space access.
 *  - Only replace 'pending' items once a figure has been verified.
 *  - 'locations' (4) and 'relocations' (3) are derived from the story — please confirm.
 *
 * kind: capacity | participation | operations | qualitative | pending
 * value: number for the count-up animation, or null with a 'display' text instead.
 */

return [
    'impact_dashboard' => [
        [
            'group' => 'Study-space access — monthly capacity by period',
            'note' => 'Each figure describes how many students a space supported per month during that period. Figures are not cumulative.',
            'metrics' => [
                [
                    'id' => 'p1',
                    'value' => 30,
                    'prefix' => '~',
                    'label' => 'First space',
                    'context' => 'About 15 women and 15 men per month · ~2 months',
                    'kind' => 'capacity',
                ],
                [
                    'id' => 'p2',
                    'value' => null,
                    'display' => '32–35',
                    'prefix' => '~',
                    'label' => 'Second, larger space',
                    'context' => 'Per month during its operating period · ~2 months',
                    'kind' => 'capacity',
                ],
                [
                    'id' => 'p4',
                    'value' => 32,
                    'prefix' => '~',
                    'label' => 'Space after relocation',
                    'context' => 'Per month during its operating period',
                    'kind' => 'capacity',
                ],
                [
                    'id' => 'p5',
                    'value' => null,
                    'display' => '15–20',
                    'prefix' => '~',
                    'label' => 'Smaller space',
                    'context' => 'Per month, adapted to available resources',
                    'kind' => 'capacity',
                ],
            ],
        ],
        [
            'group' => 'Training & operations',
            'metrics' => [
                [
                    'id' => 'ws',
                    'value' => 500,
                    'suffix' => '+',
                    'label' => 'Workshop & training participants',
                    'context' => 'Approximate, across free workshop and training activities',
                    'kind' => 'participation',
                ],
                [
                    'id' => 'loc',
                    'value' => 5,
                    'label' => 'Locations operated',
                    'context' => 'Including one location lost to an attack',
                    'kind' => 'operations',
                ],
                [
                    'id' => 'relocations',
                    'value' => 4,
                    'label' => 'Moves between locations',
                    'context' => 'Each time, student support continued',
                    'kind' => 'operations',
                ],
                [
                    'id' => 'unique',
                    'value' => null,
                    'display' => 'In verification',
                    'label' => 'Unique students reached',
                    'context' => 'A verified, de-duplicated total will be published once confirmed',
                    'kind' => 'pending',
                ],
            ],
        ],
    ],
    'impact_snapshot' => [
        [
            'id' => 'first-space',
            'value' => 30,
            'prefix' => '~',
            'label' => 'Students supported each month',
            'context' => 'In our first study space, roughly 15 women and 15 men, over about two months.',
            'kind' => 'capacity',
        ],
        [
            'id' => 'workshops',
            'value' => 500,
            'suffix' => '+',
            'label' => 'Workshop & training participants',
            'context' => 'Approximate number of students who joined our free workshops and training sessions.',
            'kind' => 'participation',
        ],
        [
            'id' => 'locations',
            'value' => 5,
            'label' => 'Locations operated',
            'context' => 'Spaces we have opened or relocated to since our first rented room.',
            'kind' => 'operations',
        ],
        [
            'id' => 'continuity',
            'value' => null,
            'display' => 'Ongoing',
            'label' => 'Support through displacement',
            'context' => 'After our second location was destroyed in an attack, we relocated and continued.',
            'kind' => 'qualitative',
        ],
    ],
    'metric_kind_label' => [
        'capacity' => 'Monthly capacity',
        'participation' => 'Participation',
        'operations' => 'Operations',
        'qualitative' => 'Continuity',
        'pending' => 'Pending verification',
    ],
];
