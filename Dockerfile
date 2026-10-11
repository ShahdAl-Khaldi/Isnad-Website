# ISNAD — single-container deploy (Laravel serves the built React app + the API).
FROM php:8.3-cli-alpine

RUN apk add --no-cache \
        nodejs npm \
        git unzip sqlite \
        oniguruma-dev icu-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring bcmath intl \
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

ENV PORT=8000
EXPOSE 8000

CMD sh -c "php artisan config:cache && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT"
