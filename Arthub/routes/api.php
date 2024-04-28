<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/forgotPassword', 'forgotPassword');
    Route::get('/mot-de-passe/reinitialiser/{token}', 'showResetForm')->name('password.reset');
    Route::post('/mot-de-passe/reset/', 'reset');
});

// Public content-related routes
Route::get('/test/{id}', [UserController::class, 'test']);
Route::get('/acteur', [UserController::class, 'acteur']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/home', [ArticleController::class, 'articleHome']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);
Route::get('/myArticle/{user}', [ArticleController::class, 'userArticles']);
Route::get('/article/{id}/rating', [RatingController::class, 'getAverageRating']);

// Protected routes (require authentication)
Route::middleware('auth:api')->group(function () {

    // User-related protected routes
    Route::get('/refreshUser', [AuthController::class, 'refreshUser']);
    Route::post('/ratings', [RatingController::class, 'store']);
    Route::get('/ratings/{article}', [RatingController::class, 'show']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Articles management routes
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
    Route::get('/myArticle', [ArticleController::class, 'myArticle']);
    
    // Following-related routes
    Route::post('/users/{user}/follow', [UserController::class, 'follow'])->name('users.follow');
    Route::post('/users/{user}/unfollow', [UserController::class, 'unfollow'])->name('users.unfollow');
    Route::post('/users/{user}/unfollower', [UserController::class, 'unfollower'])->name('users.unfollower');
    Route::get('/followers', [UserController::class, 'GetFollowers']);
    Route::get('/following', [UserController::class, 'GetFollowing']);
    Route::get('/following/{userId}', [UserController::class, 'isFollowing']);

    // Admin-only routes
    Route::middleware('role:admin')->group(function () {
        // Roles management
        Route::get('/roles', [RoleController::class, 'index']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::get('/roles/{role}', [RoleController::class, 'show']);
        Route::put('/roles/{role}', [RoleController::class, 'update']);
        Route::delete('/roles/{role}', [RoleController::class, 'destroy']);
        
        // Permissions management
        Route::get('/permissions', [PermissionsController::class, 'index']);
        Route::post('/permissions', [PermissionsController::class, 'store']);
        Route::get('/permissions/{permission}', [PermissionsController::class, 'show']);
        Route::put('/permissions/{permission}', [PermissionsController::class, 'update']);
        Route::delete('/permissions/{permission}', [PermissionsController::class, 'destroy']);
        
        // Role-Permission association
        Route::post('roles/{roleId}/permissions/{permissionId}', [RoleController::class, 'givePermissionTo']);
        Route::get('roles/{roleId}/permissions', [RoleController::class, 'getPermissions']);
        Route::delete('/roles/{roleId}/permissions/{permissionId}', [RoleController::class, 'removePermissionTo']);

        // User management
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        // Role-User association
        Route::post('/users/{userId}/roles/{roleId}', [UserController::class, 'giveRoleTo']);
        Route::get('/users/{userId}/roles', [UserController::class, 'getRoles']);
        Route::delete('/users/{userId}/roles/{roleId}', [UserController::class, 'removeRoleTo']);

        // Category management
        Route::get('/categories/{id}', [CategorieController::class, 'show']);
        Route::post('/categories', [CategorieController::class, 'store']);
        Route::put('/categories/{id}', [CategorieController::class, 'update']);
        Route::delete('/categories/{categorie}', [CategorieController::class, 'destroy']);
        
        // Article status management
        Route::put('/article/status/{article}', [ArticleController::class, 'statusAction']);
        Route::get('/article/all', [ArticleController::class, 'allArticle']);
    });
});

