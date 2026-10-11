<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\SiteData;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(SiteData::all());
    }
}
