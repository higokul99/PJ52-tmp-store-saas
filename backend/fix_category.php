<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

if (!Schema::hasColumn('stores', 'category')) {
    Schema::table('stores', function (Blueprint $table) {
        $table->string('category')->nullable()->after('status');
    });
    echo "Category column added successfully.\n";
} else {
    echo "Category column already exists.\n";
}
