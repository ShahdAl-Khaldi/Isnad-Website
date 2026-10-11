<?php

namespace App\Models;

use App\Support\Content;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'type', 'name', 'email', 'organization', 'country', 'website',
        'interest', 'topic', 'message', 'ip_address', 'emailed_at',
    ];

    protected function casts(): array
    {
        return ['emailed_at' => 'datetime'];
    }

    public function topicLabel(): ?string
    {
        if (! $this->topic) {
            return null;
        }

        return collect(Content::get('contact.contact_topics'))->firstWhere('value', $this->topic)['label'] ?? $this->topic;
    }

    public function subjectLine(): string
    {
        return $this->type === 'partnership'
            ? "Partnership inquiry — {$this->organization} ({$this->country})"
            : 'Website message — '.($this->topicLabel() ?? 'General inquiry')." from {$this->name}";
    }

    /** @return array<string, string> */
    public function displayFields(): array
    {
        $fields = $this->type === 'partnership'
            ? [
                'Organization' => $this->organization,
                'Contact person' => $this->name,
                'Work email' => $this->email,
                'Country' => $this->country,
                'Website' => $this->website,
                'Partnership interest' => $this->interest,
                'Message' => $this->message,
            ]
            : [
                'Name' => $this->name,
                'Email' => $this->email,
                'Topic' => $this->topicLabel(),
                'Organization' => $this->organization,
                'Message' => $this->message,
            ];

        return array_filter($fields, fn ($v) => filled($v));
    }
}
