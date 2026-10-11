<?php

namespace App\Http\Requests;

use App\Support\Content;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PartnerInquiryRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $website = trim((string) $this->input('website'));
        if ($website !== '' && ! preg_match('#^https?://#i', $website)) {
            $this->merge(['website' => 'https://'.$website]);
        }
    }

    public function rules(): array
    {
        return [
            'company_url' => ['prohibited'], // honeypot
            'organization' => ['required', 'string', 'max:200'],
            'contact_name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:200'],
            'country' => ['required', 'string', 'max:100'],
            'website' => ['nullable', 'url', 'max:300'],
            'interest' => ['required', Rule::in(Content::get('partnership.partnership_interest_options', []))],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'organization' => 'organization name',
            'contact_name' => 'contact person',
            'email' => 'work email',
            'website' => 'organization website',
            'interest' => 'partnership interest',
        ];
    }

}
