<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderProductIdPersistenceTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_items_persist_the_product_id(): void
    {
        $store = Store::create([
            'user_id' => null,
            'name' => 'Test Store',
            'slug' => 'test-store',
            'currency' => 'USD',
            'description' => 'Demo store',
            'status' => 'Active',
        ]);

        $category = Category::create([
            'store_id' => $store->id,
            'name' => 'Test Category',
            'slug' => 'test-category',
            'description' => 'Demo category',
            'featured' => true,
        ]);

        $product = Product::create([
            'store_id' => $store->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'SKU-001',
            'price' => 19.99,
            'stock_quantity' => 10,
            'description' => 'Demo product',
            'status' => 'In Stock',
            'is_active' => true,
        ]);

        $response = $this->postJson('/api/orders', [
            'store_id' => $store->id,
            'customer_name' => 'Jane Doe',
            'customer_email' => 'jane@example.com',
            'customer_phone' => '1234567890',
            'shipping_address' => '123 Demo St',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                ],
            ],
        ]);

        $response->assertCreated();
        $order = Order::latest('id')->first();
        $this->assertNotNull($order);

        $item = $order->items()->first();
        $this->assertNotNull($item);
        $this->assertSame($product->id, $item->product_id);
    }
}
