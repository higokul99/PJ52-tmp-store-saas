<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return all registered platform users.
     * Used by the Admin Dashboard to populate the Users module.
     */
    public function index(Request $request)
    {
        $query = User::with('stores')
            ->orderBy('id', 'desc');

        // Optional role filter
        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        $users = $query->get()->map(function ($user) {
            return [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'role'       => ucfirst($user->role ?? 'customer'),
                'phone'      => $user->phone ?? null,
                'address'    => $user->address ?? null,
                'last_login' => $user->last_login_at
                    ? \Carbon\Carbon::parse($user->last_login_at)->diffForHumans()
                    : null,
                'registered' => $user->created_at
                    ? $user->created_at->format('M d, Y')
                    : null,
                'status'     => 'Active',
                'stores'     => $user->stores->map(fn($s) => ['id' => $s->id, 'name' => $s->name]),
            ];
        });

        return response()->json($users);
    }

    /**
     * Show a single user.
     */
    public function show($id)
    {
        $user = User::with('stores')->findOrFail($id);

        return response()->json([
            'id'         => $user->id,
            'name'       => $user->name,
            'email'      => $user->email,
            'role'       => ucfirst($user->role ?? 'customer'),
            'registered' => $user->created_at?->format('M d, Y'),
            'status'     => 'Active',
            'stores'     => $user->stores->map(fn($s) => ['id' => $s->id, 'name' => $s->name]),
        ]);
    }
}
