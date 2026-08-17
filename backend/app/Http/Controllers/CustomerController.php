<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query()
            ->withCount(['orders as total_orders_count'])
            ->withSum(['orders as total_spent_amount' => function($q) use ($request) {
                if ($request->has('store_id') && $request->store_id) {
                    $q->where('store_id', $request->store_id);
                }
            }], 'total_amount');

        // Scope to only customers who have placed orders in this specific store
        if ($request->has('store_id') && $request->store_id) {
            $storeId = $request->store_id;
            $query->whereHas('orders', function ($q) use ($storeId) {
                $q->where('store_id', $storeId);
            });
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $customers = $query->orderBy('id', 'desc')->get()->map(function ($c) {
            return [
                'id'           => $c->id,
                'name'         => $c->name,
                'email'        => $c->email,
                'phone'        => $c->phone,
                'address'      => $c->address,
                'store_id'     => $c->store_id,
                'total_orders' => $c->total_orders_count ?? $c->total_orders ?? 0,
                'total_spent'  => $c->total_spent_amount ?? $c->total_spent ?? 0,
                'created_at'   => $c->created_at,
            ];
        });

        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'required|exists:stores,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    public function show($id)
    {
        $customer = Customer::with(['orders.items'])->findOrFail($id);
        return response()->json($customer);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
