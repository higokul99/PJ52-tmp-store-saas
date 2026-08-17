#!/bin/bash
# ShopNest Deployment Script for Hostinger
# Run this script via SSH from the root of your repository after pulling changes.

echo "Starting Deployment..."

# 1. Setup Backend (Laravel)
echo "Setting up Backend..."
cd backend
# Install PHP dependencies
composer install --no-dev --optimize-autoloader
# Run migrations (assuming database is configured in .env)
php artisan migrate --force
# Cache configs for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
cd ..

# 2. Frontend Build (Skipped: Hostinger does not support npm)
echo "Skipping Frontend Build (Ensure you run 'npm run build' locally and commit the dist/ folder before pushing)"
cd frontend
cd ..

# 3. Deploy to public_html
# Hostinger typically places your domains at ~/domains/yourdomain.com/
# We assume this repository is deployed alongside public_html, e.g., ~/domains/.../repository
PUBLIC_HTML_DIR="../public_html"

if [ -d "$PUBLIC_HTML_DIR" ]; then
    echo "Copying frontend build to public_html..."
    
    # Copy all compiled frontend files (including the .htaccess we created)
    cp -R frontend/dist/* "$PUBLIC_HTML_DIR/"
    
    echo "Setting up /api symlink..."
    # Remove existing api symlink or directory just in case
    rm -rf "$PUBLIC_HTML_DIR/api"
    # Create symlink from public_html/api to backend/public
    ln -s "$(pwd)/backend/public" "$PUBLIC_HTML_DIR/api"
    
    echo "✅ Deployment completed successfully!"
    echo "Visit: https://palegreen-heron-317581.hostingersite.com"
else
    echo "⚠️ Error: $PUBLIC_HTML_DIR not found."
    echo "Please ensure you cloned the repository into a folder next to 'public_html'."
fi
