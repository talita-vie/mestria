<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;

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