<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OwnerScopedCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_only_sees_their_own_categories_and_products(): void
    {
        $ownerA = User::factory()->create();
        $ownerB = User::factory()->create();

        $storeA = Store::create([
            'user_id' => $ownerA->id,
            'name' => 'Owner A Store',
            'slug' => 'owner-a-store',
            'currency' => 'USD',
            'description' => 'Store A',
            'status' => 'Active',
        ]);

        $storeB = Store::create([
            'user_id' => $ownerB->id,
            'name' => 'Owner B Store',
            'slug' => 'owner-b-store',
            'currency' => 'USD',
            'description' => 'Store B',
            'status' => 'Active',
        ]);

        $categoryA = Category::create([
            'store_id' => $storeA->id,
            'name' => 'Owner A Category',
            'slug' => 'owner-a-category',
            'description' => 'Only for owner A',
            'featured' => true,
        ]);

        Category::create([
            'store_id' => $storeB->id,
            'name' => 'Owner B Category',
            'slug' => 'owner-b-category',
            'description' => 'Only for owner B',
            'featured' => false,
        ]);

        $productA = Product::create([
            'store_id' => $storeA->id,
            'category_id' => $categoryA->id,
            'name' => 'Owner A Product',
            'slug' => 'owner-a-product',
            'sku' => 'SKU-A1',
            'price' => 25.00,
            'stock_quantity' => 10,
            'description' => 'Owned by A',
            'status' => 'In Stock',
            'is_active' => true,
        ]);

        Product::create([
            'store_id' => $storeB->id,
            'name' => 'Owner B Product',
            'slug' => 'owner-b-product',
            'sku' => 'SKU-B1',
            'price' => 30.00,
            'stock_quantity' => 3,
            'description' => 'Owned by B',
            'status' => 'Low Stock',
            'is_active' => true,
        ]);

        $categoriesResponse = $this->getJson('/api/categories?owner_id=' . $ownerA->id);
        $categoriesResponse->assertOk();
        $categoriesResponse->assertJsonCount(1);
        $categoriesResponse->assertJsonFragment(['id' => $categoryA->id]);

        $productsResponse = $this->getJson('/api/products?owner_id=' . $ownerA->id);
        $productsResponse->assertOk();
        $productsResponse->assertJsonCount(1);
        $productsResponse->assertJsonFragment(['id' => $productA->id]);
    }
}
