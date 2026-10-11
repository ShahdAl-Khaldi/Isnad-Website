<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\PartnerInquiryRequest;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

/**
 * JSON endpoints used by the React forms.
 * Every message is saved to the database FIRST; the visitor is told it was
 * received only after it has really been stored. A copy is then emailed to
 * ISNAD_FORMS_NOTIFY_EMAIL when that is configured.
 * Validation errors are returned automatically as 422 JSON by the FormRequests.
 */
class InquiryController extends Controller
{
    public function partner(PartnerInquiryRequest $request): JsonResponse
    {
        $data = $request->validated();

        return $this->store([
            'type' => 'partnership',
            'name' => $data['contact_name'],
            'email' => $data['email'],
            'organization' => $data['organization'],
            'country' => $data['country'],
            'website' => $data['website'] ?? null,
            'interest' => $data['interest'],
            'message' => $data['message'],
        ], 'Thank you — your partnership inquiry has been received. We’ll reply to your work email.');
    }

    public function contact(ContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        return $this->store([
            'type' => 'contact',
            'name' => $data['name'],
            'email' => $data['email'],
            'topic' => $data['topic'],
            'organization' => $data['organization'] ?? null,
            'message' => $data['message'],
        ], 'Thank you — your message has been received. We’ll reply to the email you provided.');
    }

    private function store(array $attributes, string $successMessage): JsonResponse
    {
        try {
            $inquiry = Inquiry::create($attributes + ['ip_address' => request()->ip()]);
        } catch (Throwable $e) {
            Log::error('Inquiry could not be saved', ['error' => $e->getMessage()]);

            return response()->json([
                'ok' => false,
                'message' => 'We couldn’t send your message just now. Please try again in a few minutes, or contact us directly.',
            ], 500);
        }

        if ($to = config('isnad.forms.notify_email')) {
            try {
                Mail::to($to)->send(new InquiryReceived($inquiry));
                $inquiry->forceFill(['emailed_at' => now()])->save();
            } catch (Throwable $e) {
                // The message is safely stored; log the email problem for the site owner.
                Log::warning('Inquiry saved but notification email failed', ['inquiry' => $inquiry->id, 'error' => $e->getMessage()]);
            }
        }

        return response()->json(['ok' => true, 'message' => $successMessage], 201);
    }
}
