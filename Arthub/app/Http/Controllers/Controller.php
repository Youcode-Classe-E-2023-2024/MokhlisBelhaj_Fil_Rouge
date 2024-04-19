<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="Example API",
 *     version="1.0.0"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     in="header",
 *     name="Authorization",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 * @OA\Schema(
 *     schema="Permissions",
 *     title="Permissions",
 *     description="Permissions schema",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the permission",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Name of the permission",
 *         example="read_users"
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
 * @OA\Schema(
 *     schema="Role",
 *     title="Role",
 *     description="Role schema",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the role",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Name of the role",
 *         example="admin"
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



class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
