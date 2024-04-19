<?php

namespace App\Http\Controllers;

use App\Models\Permissions;
use Illuminate\Http\Request;

class PermissionsController extends Controller
{
   /**
 * @OA\Get(
 *     path="/api/permissions",
 *     summary="Display a listing of permissions",
 *     tags={"Permissions"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="List of permissions",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/Permissions")
 *         )
 *     )
 * )
 */
    public function index()
    {
        $permissions = Permissions::all();
        return response()->json($permissions);
    }

    /**
 * @OA\Post(
 *     path="/api/permissions",
 *     summary="Store a newly created permission",
 *     tags={"Permissions"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="permission_name")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Permission created successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Permission created successfully!"),
 *             @OA\Property(property="permission", ref="#/components/schemas/Permissions")
 *         )
 *     )
 * )
 */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:permissions|max:255',
        ]);
    
        $permission = Permissions::create($validatedData);
        return response()->json(['message' => 'Permission created successfully!', 'permission' => $permission], 201);
    }

   
/**
 * @OA\Get(
 *     path="/api/permissions/{permission}",
 *     summary="Display the specified permission",
 *     tags={"Permissions"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="permission",
 *         in="path",
 *         required=true,
 *         description="ID of the permission",
 *         @OA\Schema(
 *             type="integer"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Permission details",
 *         @OA\JsonContent(
 *             ref="#/components/schemas/Permissions"
 *         )
 *     )
 * )
 */
    public function show(Permissions $permission)
    {
        return response()->json($permission);
    }

    
/**
 * @OA\Put(
 *     path="/api/permissions/{permission}",
 *     summary="Update the specified permission",
 *     tags={"Permissions"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="permission",
 *         in="path",
 *         required=true,
 *         description="ID of the permission",
 *         @OA\Schema(
 *             type="integer"
 *         )
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="updated_permission_name")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Permission updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Permission updated successfully!"),
 *             @OA\Property(property="permission", ref="#/components/schemas/Permissions")
 *         )
 *     )
 * )
 */
    public function update(Request $request, Permissions $permission)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:permissions,name,' . $permission->id . '|max:255',
        ]);

        $permission->update($validatedData);
        return response()->json(['message' => 'Permission updated successfully!', 'permission' => $permission]);
    }

    
/**
 * @OA\Delete(
 *     path="/api/permissions/{permission}",
 *     summary="Remove the specified permission",
 *     tags={"Permissions"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="permission",
 *         in="path",
 *         required=true,
 *         description="ID of the permission",
 *         @OA\Schema(
 *             type="integer"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Permission deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Permission deleted successfully!")
 *         )
 *     )
 * )
 */
    public function destroy(Permissions $permission)
    {
        $permission->delete();
        return response()->json(['message' => 'Permission deleted successfully!']);
    }
}
