<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Module;
use App\Models\User;

class ModuleService
{
    public function loadAuthorizedLessons(Module $module, ?User $user): Module
    {
        if (!$user) {
            return $module;
        }

        $isEnrolled = $user->enrollments()->where('course_id', $module->course_id)->exists();
        $isAuthor = $user->hasRole('instructor') && $module->course->instructor_id === $user->id;
        $isAdmin = $user->hasRole('admin');

        if ($isEnrolled || $isAuthor || $isAdmin) {
            $module->load('lessons');
        }

        return $module;
    }

    public function createModule(
        Course $course,
        array $data
    ): Module
    {
        return $course->modules()->create($data);
    }

    public function updateModule(
        Module $module,
        array $data
    ): Module
    {
        $module->update($data);

        return $module->fresh();
    }

    public function deleteModule(
        Module $module
    ): void
    {
        $module->delete();
    }
}