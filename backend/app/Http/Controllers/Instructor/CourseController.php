<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Resources\Instructor\CourseResource;
use App\Http\Requests\Course\StoreCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Services\CourseService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseService $courseService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $courses = $this->courseService
            ->getInstructorCourses($request->user());

        return response()->json(CourseResource::collection($courses));
    }

    public function store(StoreCourseRequest $request): JsonResponse
    {
        $course = $this->courseService->createCourse(
            $request->validated(), 
            $request->user()->id
        );

        return response()->json([
            'message' => 'Curso criado com sucesso.',
            'course' => new CourseResource($course)
        ], 201);
    }

    public function show(Course $course): JsonResponse
    {
        $this->authorize('view', $course);
        
        return response()->json(new CourseResource($course->load('modules.lessons')));
    }

    public function update(UpdateCourseRequest $request, Course $course): JsonResponse
    {
        $this->authorize('update', $course);

        $updatedCourse = $this->courseService->updateCourse($course, $request->validated());

        return response()->json([
            'message' => 'Curso atualizado com sucesso.',
            'course' => new CourseResource($updatedCourse)
        ]);
    }

    public function destroy(Course $course): JsonResponse
    {
        $this->authorize('delete', $course);
        
        $this->courseService->deleteCourse($course);
        
        return response()->json(['message' => 'Curso removido com sucesso.']);
    }

    public function submit(Course $course): JsonResponse 
    {
        $this->authorize('submit', $course);

        $this->courseService->submitCourse($course);

        return response()->json(['message' => 'Curso submetido! Aguarde a aprovação do admnistrador']);
    }
}
