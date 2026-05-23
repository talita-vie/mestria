<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::put('password', [UserController::class, 'updatePassword']);
    Route::delete('account', [UserController::class, 'deleteAccount']);
});