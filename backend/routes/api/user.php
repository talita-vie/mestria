<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\CategoryController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::put('password', [UserController::class, 'updatePassword']);
    Route::delete('account', [UserController::class, 'deleteAccount']);
});


// Rota para ver categorias
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
});