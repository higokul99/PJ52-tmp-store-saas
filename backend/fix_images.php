<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

if (!Schema::hasColumn('products', 'images')) {
    Schema::table('products', function (Blueprint $table) {
        $table->longText('images')->nullable()->after('image');
    });
    echo "Images column added successfully.\n";
} else {
    echo "Images column already exists.\n";
}
