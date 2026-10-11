<?php

namespace App\Support;

/**
 * Loads editable site content from resources/content/*.php.
 * Usage: Content::get('impact.impact_snapshot')
 */
class Content
{
    /** @var array<string, array> */
    private static array $loaded = [];

    public static function get(string $key, mixed $default = null): mixed
    {
        [$file, $path] = array_pad(explode('.', $key, 2), 2, null);

        if (! array_key_exists($file, self::$loaded)) {
            $filePath = resource_path("content/{$file}.php");
            self::$loaded[$file] = is_file($filePath) ? require $filePath : [];
        }

        return $path === null ? self::$loaded[$file] : data_get(self::$loaded[$file], $path, $default);
    }
}
