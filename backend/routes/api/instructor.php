<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Instructor\CourseController;
use App\Http\Controllers\Instructor\ModuleController;
use App\Http\Controllers\Instructor\LessonController;

Route::middleware(['auth:sanctum', 'verified', 'role:instructor'])->prefix('instructor')->group(function () {
    // Gestão de Cursos
    Route::apiResource('courses', CourseController::class);
    
    // Gestão de Módulos vinculados a cursos
    Route::post('courses/{course}/modules', [ModuleController::class, 'store']);
    Route::apiResource('modules', ModuleController::class)
    ->except(['store']);
    Route::patch('courses/{course}/modules/reorder', [ModuleController::class, 'reorder']);

    // Gestão de Aulas vinculadas a módulos
    Route::post('modules/{module}/lessons', [LessonController::class, 'store']);
    Route::apiResource('lessons', LessonController::class)
    ->except(['store']);;
    Route::patch('modules/{module}/lessons/reorder', [ LessonController::class, 'reorder']);
    
    // Submissão de cursos para aprovação
    Route::post('courses/{course}/submitt', [CourseController::class, 'submit']);
});