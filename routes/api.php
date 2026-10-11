<?php

use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\InquiryController;
use Illuminate\Support\Facades\Route;

// Public site content for the React app.
Route::get('/content', ContentController::class)->name('api.content');

// Form submissions (JSON). Rate-limited to 5 per minute per visitor.
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/inquiries/partner', [InquiryController::class, 'partner'])->name('api.inquiries.partner');
    Route::post('/inquiries/contact', [InquiryController::class, 'contact'])->name('api.inquiries.contact');
});
