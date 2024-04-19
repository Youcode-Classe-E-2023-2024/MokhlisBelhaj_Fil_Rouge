<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        $user = Auth::user();
        $roles= Role::where('name',$role)->first();

        if ($user && $user->hasRole($roles)) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
    }

