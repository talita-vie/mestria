<?php

namespace App\Http\Controllers\Instructor;


use App\Http\Resources\Instructor\LessonResource;
use App\Http\Requests\Lesson\StoreLessonRequest;
use App\Http\Requests\Lesson\UpdateLessonRequest;
use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use App\Services\LessonService;
use Illuminate\Http\JsonResponse;

class LessonController extends Controller
{
    public function __construct(
        private readonly LessonService $lessonService
    ) {}

   public function store(StoreLessonRequest $request, Module $module): JsonResponse
    {
        // Autoriza se o usuário pode alterar o módulo pai
        $this->authorize('update', $module);

        $lesson = $this->lessonService->createLesson($module, $request->validated());

        return response()->json([
            'message' => 'Aula criada com sucesso.',
            'lesson' => new LessonResource($lesson)
        ], 201);
    }

    public function update(UpdateLessonRequest $request, Lesson $lesson): JsonResponse
    {
        // Autoriza na própria entidade Lesson
        $this->authorize('update', $lesson);

        $updatedLesson = $this->lessonService->updateLesson($lesson, $request->validated());

        return response()->json([
            'message' => 'Aula atualizada com sucesso.',
            'lesson' => new LessonResource($updatedLesson)
        ]);
    }

    public function destroy(Lesson $lesson): JsonResponse
    {
        $this->authorize('delete', $lesson);
        
        $this->lessonService->deleteLesson($lesson);
        
        return response()->json(['message' => 'Aula removida com sucesso.']);
    }
}