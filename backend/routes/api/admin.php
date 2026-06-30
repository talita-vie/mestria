<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\CategoryController;
use App\Models\Category;

// ── Rotas exclusivas de admnistrador ─────────────────────
Route::middleware(['auth:sanctum', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    // Gestão de Usuários 
    Route::get('users', [UserManagementController::class, 'index']);                 
    Route::get('users/{user}', [UserManagementController::class, 'show']);           
    Route::post('users', [UserManagementController::class, 'createUser']);           
    Route::put('users/{user}', [UserManagementController::class, 'updateUser']);      
    Route::delete('users/{user}', [UserManagementController::class, 'destroyUser']);

    //Gestão de Categorias
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        
});

