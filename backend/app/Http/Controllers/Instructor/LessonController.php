<?php

namespace App\Http\Controllers\Instructor;


use App\Http\Resources\Instructor\LessonResource;
use Illuminate\Http\Request;
use App\Http\Requests\Lesson\StoreLessonRequest;
use App\Http\Requests\Lesson\UpdateLessonRequest;
use App\Http\Controllers\Controller;
use App\Models\Course;
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

    public function show(Course $course, Module $module, Lesson $lesson): JsonResponse
    {
        $this->authorize('view', $lesson);
 
        $lesson->load('module.course.instructor');
 
        return response()->json(new LessonResource($lesson));
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

      public function reorder(Request $request, Module $module): JsonResponse
    {
        $this->authorize('update', $module);
 
        $request->validate([
            'lessons'          => ['required', 'array'],
            'lessons.*.id'     => ['required', 'integer', 'exists:lessons,id'],
            'lessons.*.position'  => ['required', 'integer', 'min:1'],
        ]);
 
        $this->lessonService->reorderLessons($module, $request->input('lessons'));
 
        return response()->json(['message' => 'Aulas reordenadas com sucesso.']);
    }
}