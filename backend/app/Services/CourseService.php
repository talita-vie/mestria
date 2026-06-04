<?php

namespace App\Services;

use App\Models\Course;
use App\Models\User;


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

        return Course::create($data);
    }

    public function updateCourse(
        Course $course,
        array $data
    ): Course {
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
}