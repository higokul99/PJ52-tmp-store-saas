<?php
// Bootstrap Laravel
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// ── 1. Show current state ──────────────────────────────────────────────
$stores = DB::table('stores')->select('id', 'name', 'slug', 'subdomain', 'user_id')->get();
echo "=== STORES ===\n";
foreach ($stores as $s) {
    echo "  ID={$s->id}  name={$s->name}  slug=[{$s->slug}]  subdomain=[{$s->subdomain}]  user_id={$s->user_id}\n";
}

$products = DB::table('products')->select('id', 'name', 'store_id')->orderBy('id')->get();
echo "\n=== PRODUCTS ===\n";
foreach ($products as $p) {
    echo "  ID={$p->id}  store_id=" . ($p->store_id ?? 'NULL') . "  name={$p->name}\n";
}

$categories = DB::table('categories')->select('id', 'name', 'store_id')->orderBy('id')->get();
echo "\n=== CATEGORIES ===\n";
foreach ($categories as $c) {
    echo "  ID={$c->id}  store_id=" . ($c->store_id ?? 'NULL') . "  name={$c->name}\n";
}

// ── 2. Fix store slug/subdomain for any store where both are blank/null ──
$fixedStores = 0;
foreach ($stores as $s) {
    $needsSlug      = empty(trim((string)$s->slug));
    $needsSubdomain = empty(trim((string)$s->subdomain));

    if ($needsSlug || $needsSubdomain) {
        $generatedSlug = strtolower(preg_replace('/[^a-z0-9]+/', '-', strtolower($s->name)));
        DB::table('stores')->where('id', $s->id)->update([
            'slug'      => $needsSlug      ? $generatedSlug : $s->slug,
            'subdomain' => $needsSubdomain ? $generatedSlug : $s->subdomain,
        ]);
        echo "\n✅ Fixed store [{$s->name}] ID={$s->id}: slug={$generatedSlug}, subdomain={$generatedSlug}\n";
        $fixedStores++;
    }
}
if ($fixedStores === 0) echo "\n✅ All store slugs/subdomains already set.\n";

// ── 3. For each store, find orphaned products/categories and link them ──
// Products/categories with store_id=null → assign to the store whose name/subdomain matches
// the store_name / store_subdomain stored in localStorage-synced fields, OR to the first store
// Strategy: assign all NULL store_id products/categories to the store they belong to
// We'll check by name similarity or just show counts so user can decide

// Fetch updated stores
$stores = DB::table('stores')->select('id', 'name', 'slug', 'subdomain')->get();

$orphanedProducts   = DB::table('products')->whereNull('store_id')->count();
$orphanedCategories = DB::table('categories')->whereNull('store_id')->count();

echo "\n=== ORPHANED RECORDS ===\n";
echo "  Products with store_id=NULL: {$orphanedProducts}\n";
echo "  Categories with store_id=NULL: {$orphanedCategories}\n";

// If there is only ONE store, assign all orphaned records to it
if ($stores->count() === 1) {
    $onlyStore = $stores->first();
    DB::table('products')->whereNull('store_id')->update(['store_id' => $onlyStore->id]);
    DB::table('categories')->whereNull('store_id')->update(['store_id' => $onlyStore->id]);
    echo "\n✅ Assigned all {$orphanedProducts} orphaned products and {$orphanedCategories} orphaned categories to store [{$onlyStore->name}] ID={$onlyStore->id}\n";
} elseif ($stores->count() > 1) {
    // Multiple stores — show them and list which products/categories are orphaned
    echo "\n⚠️  Multiple stores found. Showing orphaned records:\n";

    $oProds = DB::table('products')->whereNull('store_id')->select('id', 'name')->get();
    foreach ($oProds as $p) echo "  PRODUCT ID={$p->id} name={$p->name}\n";

    $oCats = DB::table('categories')->whereNull('store_id')->select('id', 'name')->get();
    foreach ($oCats as $c) echo "  CATEGORY ID={$c->id} name={$c->name}\n";

    echo "\nStores available:\n";
    foreach ($stores as $s) echo "  ID={$s->id}  name={$s->name}  subdomain={$s->subdomain}\n";
}

echo "\n=== FINAL STATE ===\n";
$stores = DB::table('stores')->select('id', 'name', 'slug', 'subdomain', 'user_id')->get();
foreach ($stores as $s) {
    echo "  STORE ID={$s->id}  name={$s->name}  slug=[{$s->slug}]  subdomain=[{$s->subdomain}]\n";
}
$products = DB::table('products')->select('id', 'name', 'store_id')->orderBy('id')->get();
foreach ($products as $p) {
    echo "  PRODUCT ID={$p->id}  store_id=" . ($p->store_id ?? 'NULL') . "  name={$p->name}\n";
}
$categories = DB::table('categories')->select('id', 'name', 'store_id')->orderBy('id')->get();
foreach ($categories as $c) {
    echo "  CATEGORY ID={$c->id}  store_id=" . ($c->store_id ?? 'NULL') . "  name={$c->name}\n";
}
echo "\nDone.\n";
