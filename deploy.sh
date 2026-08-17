#!/bin/bash
# ShopNest Deployment Script for Hostinger
# Run this script via SSH from the root of your repository after pulling changes.

echo "Starting Deployment..."

# 1. Setup Backend (Laravel)
echo "Setting up Backend..."
cd backend
# Use --ignore-platform-reqs to bypass Hostinger's PHP 8.2 CLI default
composer install --ignore-platform-reqs --no-dev --optimize-autoloader
# Run migrations (assuming database is configured in .env)
php artisan migrate --force
# Cache configs for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
cd ..

# 2. Frontend Build (Skipped: Hostinger does not support npm)
echo "Skipping Frontend Build (Ensure you run 'npm run build' locally and commit the dist/ folder before pushing)"

echo "✅ Deployment completed successfully!"
echo "Note: Copying and symlinking is no longer needed since the root .htaccess handles all routing."
echo "Visit: https://palegreen-heron-317581.hostingersite.com"
