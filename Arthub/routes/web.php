<?php

use App\Http\Controllers\UserController;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Guest Routes
Route::middleware("guest")->group(function() {
    // Registration Routes
    Route::get('/register', [UserController::class, 'createRegister'])->name('register.form');
    
    // Login Routes
    Route::get('/login', [UserController::class, 'createLogin'])->name('login.form');
    
    // Password Reset Routes
    Route::get('/password/reset', [UserController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('/password/email', [UserController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('/password/reset/{token}', [UserController::class, 'showResetForm'])->name('password.reset');
    Route::post('/password/reset', [UserController::class, 'reset'])->name('password.update');
});

// Authenticated User Routes
Route::middleware("auth")->group(function(){
    // Logout Route
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
});

