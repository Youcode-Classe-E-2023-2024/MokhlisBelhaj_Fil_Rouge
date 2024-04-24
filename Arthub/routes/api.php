<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionsController;
use Illuminate\Validation\Rules\Can;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes of authtication
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/forgotPassword', 'forgotPassword');
    Route::get('/mot-de-passe/reinitialiser/{token}', 'showResetForm')->name('password.reset');
    Route::post('/mot-de-passe/reset/', 'reset');
});

Route::get('/test/{id}', [UserController::class, 'test']);
Route::get('/acteur', [UserController::class, 'acteur']);
Route::get('/users/{id}', [UserController::class, 'show']);


// Protected routes 
Route::middleware('auth:api')->group(function () {

    Route::get('/refreshUser', [AuthController::class, 'refreshUser']);

    // logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected admin route routes 
    Route::middleware('role:admin')->group(function () {
        // Routes pour les rôles
        Route::get('/roles', [RoleController::class, 'index']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::get('/roles/{role}', [RoleController::class, 'show']);
        Route::put('/roles/{role}', [RoleController::class, 'update']);
        Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

        // Routes pour les permissions
        Route::get('/permissions', [PermissionsController::class, 'index']);
        Route::post('/permissions', [PermissionsController::class, 'store']);
        Route::get('/permissions/{permission}', [PermissionsController::class, 'show']);
        Route::put('/permissions/{permission}', [PermissionsController::class, 'update']);
        Route::delete('/permissions/{permission}', [PermissionsController::class, 'destroy']);

        // Route pour assigner une permission à un rôle
        Route::post('roles/{roleId}/permissions/{permissionId}', [RoleController::class, 'givePermissionTo']);
        // Route pour savoir les permision assigner à un rôle
        Route::get('roles/{roleId}/permissions', [RoleController::class, 'getPermissions']);
        // Route pour retirer une permission d'un rôle
        Route::delete('/roles/{roleId}/permissions/{permissionId}', [RoleController::class, 'removePermissionTo']);

        // Obtenir tous les utilisateurs
        Route::get('/users', [UserController::class, 'index'])->middleware('role:admin');
        // Créer un nouvel utilisateur
        Route::post('/users', [UserController::class, 'store']);
        // Obtenir un utilisateur spécifique par ID
        // Route::get('/users/{id}', [UserController::class, 'show']);
        // Mettre à jour un utilisateur par ID
        Route::put('/users/{user}', [UserController::class, 'update']);
        // Supprimer un utilisateur par ID
        Route::delete('/users/{user}', [UserController::class, 'destroy']);


        // Assigner un rôle à un utilisateur par ID utilisateur et ID de rôle
        Route::post('/users/{userId}/roles/{roleId}', [UserController::class, 'giveRoleTo']);

        // Route pour connaître les rôles assignés à un utilisateur
        Route::get('/users/{userId}/roles', [UserController::class, 'getRoles']);

        // Supprimer un rôle d'un utilisateur par ID utilisateur et ID de rôle
        Route::delete('/users/{userId}/roles/{roleId}', [UserController::class, 'removeRoleTo']);

        // categories routes 
        Route::get('/categories',[CategorieController::class,'index']);
        Route::get('/categories/{id}',[CategorieController::class,'show']);
        Route::post('/categories',[CategorieController::class,'store']);
        Route::put('/categories/{id}',[CategorieController::class,'update']);
        Route::delete('/categories/{categorie}',[CategorieController::class,'destroy']);

    });
    // folow
    Route::post('/users/{user}/follow', [UserController::class, 'follow'])->name('users.follow');
    Route::post('/users/{user}/unfollow', [UserController::class, 'unfollow'])->name('users.unfollow');
    Route::post('/users/{user}/unfollower', [UserController::class, 'unfollower'])->name('users.unfollow');
    Route::get('followers', [UserController::class, 'GetFollowers']);
    Route::get('following', [UserController::class, 'GetFollowing']);
    Route::get('following/{userId}', [UserController::class, 'isFollowing']);
    
});
