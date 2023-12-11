FROM php:8.2.8-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql

# composer
COPY --from=composer:2.6.5 /usr/bin/composer /usr/bin/composer
COPY ./backend/composer.* ./
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction
COPY ./backend .
RUN composer dump-autoload --optimize