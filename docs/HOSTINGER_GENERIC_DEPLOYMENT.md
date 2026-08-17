# Hostinger Generic Deployment Guide (Subfolder Routing)

This guide provides a clean, generic approach to deploying a split-stack application (e.g., React frontend + Laravel backend) on a shared hosting environment like Hostinger. 

Instead of polluting your `public_html` directory with application files, this approach allows you to clone your entire Git repository into a subfolder (e.g., `code`) and uses a master `.htaccess` file to elegantly route traffic to the appropriate frontend or backend directories.

---

## The Architecture

Your `public_html` directory will contain almost nothing. It will look like this:

```text
public_html/
├── .htaccess      # The master traffic controller
└── code/          # Your cloned git repository
    ├── backend/   # Laravel application
    └── frontend/  # React application
```

- **`yourdomain.com/`** → Invisibly routes to `code/frontend/dist/`
- **`yourdomain.com/api/`** → Invisibly routes to `code/backend/public/`

---

## Step 1: Clean Up `public_html`

SSH into your Hostinger server and ensure your `public_html` folder is empty (you can keep Hostinger's default `DO_NOT_UPLOAD_HERE` file if it exists).

```bash
cd public_html
# WARNING: This deletes everything in the folder!
rm -rf *
```

---

## Step 2: Clone Your Repository

Because Hostinger often does not support `npm` via SSH, you must ensure you have built your frontend locally (`npm run build`) and committed the `dist/` folder to your Git repository before cloning.

Clone your repository directly into a folder named `code`:

```bash
git clone <your-github-repo-url> code
```

---

## Step 3: Create the Master `.htaccess`

Create an `.htaccess` file directly inside `public_html/` (alongside the `code/` folder).

```bash
nano .htaccess
```

Paste the following configuration:

```apache
<IfModule mod_rewrite.c>
    # Ensure Apache has permission to follow symlinks/rewrites and prevent directory listing
    Options +FollowSymLinks -Indexes

    RewriteEngine On
    RewriteBase /

    # --- CRITICAL FIX: Stop rewrite loop if already routed to /code/ ---
    RewriteCond %{REQUEST_URI} ^/code/ [NC]
    RewriteRule ^ - [L]

    # 1. Route /api traffic to the Laravel backend
    RewriteCond %{REQUEST_URI} ^/api [NC]
    RewriteRule ^api/(.*)$ code/backend/public/$1 [L]

    # 2. Serve static files from the React frontend (only if it's an actual file)
    RewriteCond %{REQUEST_URI} !^/api [NC]
    RewriteCond %{DOCUMENT_ROOT}/code/frontend/dist%{REQUEST_URI} -f
    RewriteRule ^(.*)$ code/frontend/dist/$1 [L]

    # 3. Fallback all other non-API traffic to React's index.html (SPA Routing)
    RewriteCond %{REQUEST_URI} !^/api [NC]
    RewriteRule ^(.*)$ code/frontend/dist/index.html [L]
</IfModule>
```

**How it works:**
1. If the URL starts with `/api`, it forces the request into Laravel's `public/index.php`.
2. If the URL doesn't start with `/api`, it checks if the requested file (like an image or CSS) exists in the React `dist/` folder. If it does, it serves it.
3. If the file doesn't exist, it routes the request to React's `index.html` so your React Router can take over.

---

## Step 4: Configure the Backend

Navigate into your cloned backend directory and set up Laravel for production:

```bash
cd code/backend

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Setup environment variables
cp .env.example .env
nano .env
```

Ensure your `.env` has the correct production settings:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=your_hostinger_db_name
DB_USERNAME=your_hostinger_db_user
DB_PASSWORD=your_hostinger_db_password
```

Run database migrations:
```bash
php artisan migrate --force
```

---

## Future Updates

Updating your live site is now incredibly simple. 

1. Make changes locally.
2. Run `npm run build` in your frontend.
3. Commit and push to GitHub.
4. SSH into Hostinger, navigate to `public_html/code`, and pull the changes:

```bash
cd public_html/code
git pull origin main

# If you made backend changes, run migrations/composer:
cd backend
composer install --no-dev
php artisan migrate --force
```
