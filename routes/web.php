<?php

use App\Http\Controllers\SitemapController;
use App\Support\SiteData;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');

// Old page addresses → the new, simpler pages (permanent redirects).
Route::permanentRedirect('/our-story', '/about');
Route::permanentRedirect('/impact', '/about');
Route::permanentRedirect('/programs', '/about');
Route::permanentRedirect('/updates', '/about');
Route::permanentRedirect('/partner', '/sponsor#organizations');

/*
| The React app (resources/js) handles every page. Laravel serves one HTML
| shell with the site content embedded, so the first render is instant.
| Unknown paths still load the app (which shows its "not found" page) but
| with a real 404 status for search engines.
*/
Route::get('/{path?}', function (?string $path = null) {
    $known = ['', 'about', 'sponsor', 'contact', 'privacy'];
    $status = in_array(trim((string) $path, '/'), $known, true) ? 200 : 404;

    return response()->view('app', ['data' => SiteData::all(), 'path' => '/'.trim((string) $path, '/')], $status);
})->where('path', '(?!api/|api$|build/|storage/|up$).*')->name('app');
