<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CourseService
{
    /**
     * Lista cursos com relacionamentos.
     */
    public function getAllCourses(int $perPage = 15)
    {
        return Course::with([
            'instructor',
            'category'
        ])->paginate($perPage);
    }

    /**
     * Lista cursos do instrutor autenticado.
     */
    public function getInstructorCourses(User $user, int $perPage = 15)
    {
        return Course::with([
            'category'
        ])
            ->where('instructor_id', $user->id)
            ->paginate($perPage);
    }

    public function createCourse(array $data, int $instructorId): Course
    {
        $data['instructor_id'] = $instructorId;
        $data['status'] = 'draft'; 
        $data['thumbnail'] = $this->storeThumbnail($data['thumbnail'] ?? null);


        return Course::create($data);
    }

    public function updateCourse( Course $course, array $data): Course 
    {
        if (array_key_exists ('thumbnail', $data)) {
            $this->deleteOldThumbnail($course->thumbnail);
            $data['thumbnail'] = $this->storeThumbnail($data['thumbnail']);
        }
        $course->update($data);

        return $course->fresh([
            'instructor',
            'category'
        ]);
    }

    public function deleteCourse(
        Course $course
    ): void {
        $course->delete();
    }

    public function submitCourse(Course $course)
    {

        if ($course->modules()->doesntExist()) {
            throw ValidationException::withMessages([
                'course' => 'O curso precisa possuir módulos.'
            ]);
        }

        if ($course->modules()->withCount('lessons')
            ->having('lessons_count', 0)
            ->exists()) {
            throw ValidationException::withMessages([
            'course' => 'Todos os módulos precisam possuir aulas.'
            ]);
        }

        $course->update([
            'status' => 'pending_approval',
            'submitted_for_review_at' => now(),
        ]);
    }


    /**
     * Thumbnaiil
     */

        private function storeThumbnail (mixed $file): ?string 
        {
            if (!$file instanceof UploadedFile) {
                return null;
            }
            return $file->store('thumbnails', 'public');
        }  

        private function deleteOldThumbnail(?string $path): void
        {
            if ($path) {
                Storage::disk('public')->delete($path);
            }
        }
}
