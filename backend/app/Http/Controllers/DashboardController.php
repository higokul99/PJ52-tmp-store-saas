<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $storeId = $request->query('store_id');

        $storesQuery = Store::query();
        $productsQuery = Product::query();
        $ordersQuery = Order::where('status', '!=', 'Cancelled');

        if ($storeId) {
            $productsQuery->where('store_id', $storeId);
            $ordersQuery->where('store_id', $storeId);
        }

        $totalStores = $storesQuery->count();
        $totalProducts = $productsQuery->count();
        $totalOrders = Order::when($storeId, fn($q) => $q->where('store_id', $storeId))->count();
        $totalRevenueNum = $ordersQuery->sum('total_amount');

        $recentOrders = Order::when($storeId, fn($q) => $q->where('store_id', $storeId))
            ->with(['items', 'store'])
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

        $topProducts = Product::when($storeId, fn($q) => $q->where('store_id', $storeId))
            ->orderBy('stock_quantity', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'stores' => $totalStores,
            'products' => $totalProducts,
            'orders' => $totalOrders,
            'revenue_raw' => round($totalRevenueNum, 2),
            'revenue' => '$' . number_format($totalRevenueNum, 2),
            'recent_orders' => $recentOrders,
            'top_products' => $topProducts,
            'analytics' => [
                'chart_labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                'chart_data' => [1200, 2400, 3100, 4800, 6200, 7900, round($totalRevenueNum, 0)],
            ]
        ]);
    }
}
