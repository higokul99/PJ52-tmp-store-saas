<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$store = \App\Models\Store::find(3);
if ($store) {
    $store->user_id = 5;
    $store->name = 'velvet bloom';
    $store->save();
    echo "Fixed store user_id and name.\n";
} else {
    echo "Store 3 not found.\n";
}

$count = \App\Models\Category::whereNull('store_id')->update(['store_id' => 3]);
echo "Fixed {$count} orphaned categories.\n";
