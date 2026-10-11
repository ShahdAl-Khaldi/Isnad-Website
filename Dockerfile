# ISNAD — single-container deploy (Laravel serves the built React app + the API).
FROM php:8.4-cli-alpine

RUN apk add --no-cache \
        nodejs npm \
        git unzip sqlite-dev \
        oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring bcmath \
    && rm -rf /var/cache/apk/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress \
    && npm ci \
    && npm run build \
    && rm -rf node_modules

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database

EXPOSE 8000

CMD ["sh", "-c", "php artisan config:cache; php artisan migrate --force; php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
