<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Schema(
 *     schema="User",
 *     title="User",
 *     description="User schema",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the user",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Name of the user",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="Email of the user",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="password",
 *         type="string",
 *         description="Password of the user",
 *         example="secret123"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Creation date",
 *         example="2024-03-30 12:00:00"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Last update date",
 *         example="2024-03-30 12:00:00"
 *     )
 * )
 */

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/users",
     *     summary="Display a listing of users",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     )
     * )
     */

    public function index()
    {
        $usersWithoutAdmin = User::with('roles:name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'admin');
            })
            ->get()
            ->map(function ($user) {
                $roles = $user->roles->pluck('name')->toArray();
                $userArray = $user->toArray(); // Convert user to an array
                $userArray['roles'] = $roles; // Add roles to the user array
                return $userArray;
            });

        return response()->json($usersWithoutAdmin); // Return the result as JSON
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @OA\Post(
     *     path="/users",
     *     summary="Store a newly created user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="user",
     *                 ref="#/components/schemas/User"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Validation Error"
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'email' => 'required|string|email:rfc,dns|max:250|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ])->giveRolesTo('user');

        // Optionally assign roles here if needed

        return response()->json(['user' => $user], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/users/{id}",
     *     summary="Display the specified user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User details",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */

    public function show($id)
    {

        $user = User::findOrFail($id);
        $userWithRoles = $user->load('roles:name');
        $userArray = $userWithRoles->toArray();
        $roles = $userWithRoles->roles->toArray();
        $userArray['roles'] = $roles;
        $userArray['Article'] = $user->articles()->count();
        $userArray['followers'] = $user->followers()->count();


        return response()->json($userArray);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     *
     * @OA\Put(
     *     path="/users/{id}",
     *     summary="Update the specified user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="user",
     *                 ref="#/components/schemas/User"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Validation Error"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */

    public function update(Request $request, User $user)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'email' => 'required|string|email:rfc,dns|max:250|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Optionally update roles here if needed

        return response()->json(['user' => $user], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     *
     * @OA\Delete(
     *     path="/users/{id}",
     *     summary="Remove the specified user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="User deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 204);
    }

    /**
     * Assign a role to a user.
     *
     * @param int $UserId ID of the user.
     * @param int $roleId ID of the role.
     * @return \Illuminate\Http\Response
     *
     * @OA\Post(
     *     path="/users/{UserId}/roles/{roleId}",
     *     summary="Assign a role to a user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="UserId",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="roleId",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role assigned to user successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User or Role not found"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="User already has this Role"
     *     )
     * )
     */



    public function giveRoleTo($UserId, $roleId)
    {
        $user = User::findOrFail($UserId);
        $role = Role::findOrFail($roleId);
        if ($user && $role) {
            // Assign permission to role
            if (!$user->hasRole($role)) {
                $user->giveRolesTo($role);

                return response()->json(['message' => 'Role assigned to user successfully!']);
            } else {
                return response()->json(['message' => ' user has this Role ']);
            }
        } else {
            return response()->json(['error' => 'User or Role not found.'], 404);
        }
    }

    /**
     * Get all roles associated with a user.
     *
     * @param int $userId ID of the user.
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/users/{userId}/roles",
     *     summary="Get all roles associated with a user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of roles associated with the user",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Role")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */

    public function getRoles($userId)
    {
        // Retrieve the user instance
        $user = user::findOrFail($userId);
        // $role = $this->getRoles($user->id)
        $user->roles;


        // Get all roles associated with the role
        $roles = $user->roles()->get();


        // Return permissions as JSON response
        return response()->json($roles);
    }
    /**
     * Remove a role from a user.
     *
     * @param int $UserId ID of the user.
     * @param int $roleId ID of the role.
     * @return \Illuminate\Http\Response
     *
     * @OA\Delete(
     *     path="/users/{UserId}/roles/{roleId}",
     *     summary="Remove a role from a user",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="UserId",
     *         in="path",
     *         required=true,
     *         description="ID of the user",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="roleId",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role removed from user successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User or Role not found"
     *     )
     * )
     */


    public function removeRoleTo($UserId, $roleId)
    {
        try {
            $user = User::findOrFail($UserId);
            $role = Role::findOrFail($roleId);

            if ($role && $user) {
                if ($user->hasRole($role)) {
                    $user->removeRoleFrom($role);
                    return response()->json(['message' => 'role removed from user successfully!']);
                } else {
                    return response()->json(['error' => 'user does not have this role.'], 400);
                }
            } else {
                return response()->json(['error' => 'user or role not found.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function acteur()
    {
        $acteurs = User::whereHas('roles', function ($query) {
            $query->where('name', 'acteur');
        })->get();

        return response()->json($acteurs);
    }

    public function follow($userToFollow)
    {
        auth()->user()->following()->attach($userToFollow);
        return response()->json(['message' => 'You are now following ']);
    }

    public function unfollow($userToUnfollow)
    {
        auth()->user()->following()->detach($userToUnfollow);
        return response()->json(['message' => 'You have unfollowed ']);
    }
    public function unfollower($userToUnfollow)
    {
        auth()->user()->followers()->detach($userToUnfollow);
        return response()->json(['message' => 'You have unfollowed ']);
    }

    public function GetFollowers(Request $request)
    {
        $user = auth()->user();
        $followers = $user->followers()->get();

        return response()->json(['followers' => $followers]);
    }
    public function GetFollowing(Request $request)
    {
        $user = auth()->user();
        $following = $user->following()->get();
        return response()->json(['following' => $following]);
    }
    public function isFollowing($userId)
    {
        $user = auth()->user();


        $isFollowing = $user->following()->where('followed_id', $userId)->exists();

        return response()->json([$isFollowing]);
    }


    public function userCount()
    {
        $userCount = User::count();
        $acteurRole = Role::where('name', 'acteur')->first();
        $usersWithActeurRole = $acteurRole ? $acteurRole->users()->count() : 0;
        $articleCount = Article::count();
        return response()->json([
            'userCount' => $userCount,
            'acteursCount' => $usersWithActeurRole,
            'articleCount' => $articleCount
        ]);
    }
}
