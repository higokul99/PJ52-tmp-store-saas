<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private function getOrCreateCart(Request $request)
    {
        $storeId = $request->header('X-Store-Id') ?? $request->input('store_id', 1);
        $sessionId = $request->header('X-Session-Id') ?? $request->input('session_id', 'session_guest');

        $cart = Cart::where('store_id', $storeId)
            ->where('session_id', $sessionId)
            ->first();

        if (!$cart) {
            $cart = Cart::create([
                'store_id' => $storeId,
                'session_id' => $sessionId,
                'user_id' => $request->user()?->id,
            ]);
        }

        return $cart;
    }

    public function index(Request $request)
    {
        $cart = $this->getOrCreateCart($request);
        $cart->load('items.product');

        $subtotal = $cart->items->sum(function ($item) {
            return $item->quantity * $item->unit_price;
        });

        return response()->json([
            'cart_id' => $cart->id,
            'items' => $cart->items,
            'subtotal' => round($subtotal, 2),
            'total_items' => $cart->items->sum('quantity'),
        ]);
    }

    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $quantity = $validated['quantity'] ?? 1;

        if ($product->stock_quantity < $quantity) {
            return response()->json([
                'message' => 'Requested quantity exceeds available stock (' . $product->stock_quantity . ' available).'
            ], 422);
        }

        $cart = $this->getOrCreateCart($request);
        $productId = (int) $product->id;

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;
            if ($product->stock_quantity < $newQuantity) {
                return response()->json([
                    'message' => 'Cannot add more. Total in cart exceeds available stock (' . $product->stock_quantity . ' available).'
                ], 422);
            }
            $cartItem->update([
                'quantity' => $newQuantity,
                'unit_price' => $product->price,
            ]);
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $productId,
                'quantity' => $quantity,
                'unit_price' => $product->price,
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'cart_item' => $cartItem->load('product')
        ]);
    }

    public function updateItem(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::with('product')->findOrFail($id);

        if ($cartItem->product->stock_quantity < $validated['quantity']) {
            return response()->json([
                'message' => 'Requested quantity exceeds available stock.'
            ], 422);
        }

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json([
            'message' => 'Cart quantity updated',
            'cart_item' => $cartItem
        ]);
    }

    public function removeItem($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    public function clearCart(Request $request)
    {
        $cart = $this->getOrCreateCart($request);
        CartItem::where('cart_id', $cart->id)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}
