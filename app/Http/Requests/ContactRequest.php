<?php

namespace App\Http\Requests;

use App\Support\Content;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContactRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_url' => ['prohibited'], // honeypot
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:200'],
            'topic' => ['required', Rule::in(array_column(Content::get('contact.contact_topics', []), 'value'))],
            'organization' => ['nullable', 'string', 'max:200'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

}
