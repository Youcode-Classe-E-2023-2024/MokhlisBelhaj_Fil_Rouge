<?php

namespace App\Http\Controllers;

use App\Models\Permissions;
use App\Models\Role;
use Illuminate\Http\Request;


class RoleController extends Controller
{
         /**
     * @OA\Get(
     *     path="/api/roles",
     *     summary="Display a listing of roles",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of roles",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Role")
     *         )
     *     )
     * )
     */

    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

  /**
     * @OA\Post(
     *     path="/api/roles",
     *     summary="Store a newly created role in storage",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="admin"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Role created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role created successfully!"),
     *             @OA\Property(property="role", ref="#/components/schemas/Role")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:roles|max:255',
        ]);

        $role = Role::create($validatedData);
        return response()->json(['message' => 'Role created successfully!', 'role' => $role], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/roles/{role}",
     *     summary="Display the specified role",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="role",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role details",
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     )
     * )
     */
    public function show(Role $role)
    {
        return response()->json($role);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

   
    /**
     * @OA\Put(
     *     path="/api/roles/{role}",
     *     summary="Update the specified role",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="role",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="admin"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role updated successfully!"),
     *             @OA\Property(property="role", ref="#/components/schemas/Role")
     *         )
     *     )
     * )
     */
    public function update(Request $request, Role $role)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id . '|max:255',
        ]);

        $role->update($validatedData);
        return response()->json(['message' => 'Role updated successfully!', 'role' => $role]);
    }

    
    /**
     * @OA\Delete(
     *     path="/api/roles/{role}",
     *     summary="Remove the specified role from storage",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="role",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Role deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Role deleted successfully!")
     *         )
     *     )
     * )
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully!']);
    }

  
    /**
     * @OA\Post(
     *     path="/api/roles/{roleId}/permissions/{permissionId}",
     *     summary="Assign a permission to a role",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="roleId",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="permissionId",
     *         in="path",
     *         required=true,
     *         description="ID of the permission",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission assigned to role successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Permission assigned to role successfully!")
     *         )
     *     )
     * )
     */

    public function givePermissionTo($roleId, $permissionId)
    {
        // Retrieve the role and permission instances
        $role = Role::findOrFail($roleId);
        $permission = Permissions::findOrFail($permissionId);

        // Check if permission exists
        if ($permission && $role) {
            // Assign permission to role
            $role->givePermissionTo($permission);

            return response()->json(['message' => 'Permission assigned to role successfully!']);
        } else {
            return response()->json(['error' => 'Role or permission not found.'], 404);
        }
    }
  
   /**
 * Get all permissions associated with a role.
 *
 * @param int $roleId ID of the role.
 * @return \Illuminate\Http\Response
 *
 * @OA\Get(
 *     path="/roles/{roleId}/permissions",
 *     summary="Get all permissions associated with a role",
 *     tags={"Roles"},
 *     security={{"bearerAuth":{}}},
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
 *         description="List of permissions associated with the role",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/Permissions")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Role not found"
 *     )
 * )
 */
    public function getPermissions($roleId)
    {
        // Retrieve the role instance
        $role = Role::findOrFail($roleId);

        // Get all permissions associated with the role
        $permissions = $role->permissions()->get();

        // Return permissions as JSON response
        return response()->json($permissions);
    }





    
    /**
     * @OA\Delete(
     *     path="/api/roles/{roleId}/permissions/{permissionId}",
     *     summary="Remove a permission from a role",
     *     tags={"Roles"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="roleId",
     *         in="path",
     *         required=true,
     *         description="ID of the role",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="permissionId",
     *         in="path",
     *         required=true,
     *         description="ID of the permission",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Permission removed from role successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Permission removed from role successfully!")
     *         )
     *     )
     * )
     */
    public function removePermissionTo( $roleId,$permissionId)
    {
        try {
            $role = Role::findOrFail($roleId);
            $permission = Permissions::findOrFail($permissionId);

            if ($role && $permission) {
                if ($role->hasPermission($permission)) {
                    $role->removePermissionFrom($permission);
                    return response()->json(['message' => 'Permission removed from role successfully!']);
                } else {
                    return response()->json(['error' => 'Role does not have this permission.'], 400);
                }
            } else {
                return response()->json(['error' => 'Role or permission not found.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

   
}
