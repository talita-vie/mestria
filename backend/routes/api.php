<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\InstructorApprovalController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Support\Facades\Route;

// ── Rotas públicas (sem autenticação) ──────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:register');
    Route::post('login',    [AuthController::class, 'login'])->middleware('throttle:login');

    Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed'])
        ->name('verification.verify');

    Route::post('forgot-password', [PasswordResetController::class, 'forgot']);
    Route::post('reset-password', [PasswordResetController::class, 'reset']);

    // ── Rotas protegidas (exige token Sanctum) ─────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('email/resend', [AuthController::class, 'resendVerification'])
            ->middleware('throttle:resend-verify');

        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('user',         [AuthController::class, 'me']);
    Route::put('password', [UserController::class, 'updatePassword']);
    Route::delete('account', [UserController::class, 'deleteAccount']);

});
