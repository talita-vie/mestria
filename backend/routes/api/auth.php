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

    Route::post('forgot-password', [PasswordResetController::class, 'forgot'])->middleware('throttle:forgot');
    Route::post('reset-password', [PasswordResetController::class, 'reset'])->middleware('throttle:reset');

    Route::post('email/resend', [AuthController::class, 'resendByEmail'])
        ->middleware('throttle:resend-verify');

    // ── Rotas protegidas (exige token Sanctum) ─────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });
});