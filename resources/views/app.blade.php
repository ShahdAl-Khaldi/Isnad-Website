{{-- Single HTML shell for the React app (resources/js/main.jsx). --}}
@php
    $site = $data['site'];
    $titles = [
        '/' => $site['name'].' — '.$site['tagline'],
        '/about' => 'About · '.$site['name'],
        '/sponsor' => 'Sponsor a Student · '.$site['name'],
        '/contact' => 'Contact · '.$site['name'],
        '/privacy' => 'Privacy Policy · '.$site['name'],
    ];
    $title = $titles[$path] ?? 'Page not found · '.$site['name'];
    $locale = app()->getLocale();
@endphp
<!DOCTYPE html>
<html lang="{{ $locale }}" dir="{{ config("isnad.locales.$locale.dir", 'ltr') }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0b0d12">
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $site['description'] }}">
    <link rel="canonical" href="{{ url($path) }}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $site['name'] }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $site['description'] }}">
    <meta property="og:url" content="{{ url($path) }}">
    <meta property="og:image" content="{{ asset('images/og-default.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">

    <script>
        (function () {
            try {
                var t = localStorage.getItem('isnad-theme');
                if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
            } catch (e) {}
        })();
    </script>
    <script>window.__ISNAD__ = @json($data);</script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
</head>
<body>
    <div id="root"></div>
    <noscript>
        <div style="padding:2rem;font-family:sans-serif">
            ISNAD — {{ $site['description'] }} Please enable JavaScript to view this site,
            or contact us at {{ $site['contact']['email'] }}.
        </div>
    </noscript>
</body>
</html>
