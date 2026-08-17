<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'store']);

        if ($request->has('store_id') && $request->store_id) {
            $query->where('store_id', $request->store_id);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $inventory = $query->orderBy('stock_quantity', 'asc')->get();

        $stats = [
            'total_items' => $inventory->count(),
            'in_stock' => $inventory->where('status', 'In Stock')->count(),
            'low_stock' => $inventory->where('status', 'Low Stock')->count(),
            'out_of_stock' => $inventory->where('status', 'Out of Stock')->count(),
        ];

        return response()->json([
            'stats' => $stats,
            'products' => $inventory
        ]);
    }

    public function updateStock(Request $request, $id)
    {
        $validated = $request->validate([
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product = Product::findOrFail($id);
        $stock = (int)$validated['stock_quantity'];
        $status = $stock <= 0 ? 'Out of Stock' : ($stock <= 5 ? 'Low Stock' : 'In Stock');

        $product->update([
            'stock_quantity' => $stock,
            'status' => $status
        ]);

        return response()->json([
            'message' => 'Stock updated successfully',
            'product' => $product->load(['category', 'store'])
        ]);
    }
}
