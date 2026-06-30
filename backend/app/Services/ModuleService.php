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

    public function reorderModules(Course $course, array $items): void
    {
        // Garante que só reordena módulos que pertencem ao curso
        $validIds = $course->modules()->pluck('id')->flip();
 
        foreach ($items as $item) {
            if (!isset($validIds[$item['id']])) {
                continue;
            }
 
            Module::where('id', $item['id'])
                ->update(['position' => $item['position']]);
        }
    }
}