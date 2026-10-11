<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $pages = ['' => '1.0', 'about' => '0.8', 'sponsor' => '0.9', 'contact' => '0.7', 'privacy' => '0.3'];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach ($pages as $path => $priority) {
            $xml .= '<url><loc>'.e(url($path)).'</loc><changefreq>monthly</changefreq><priority>'.$priority.'</priority></url>';
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
