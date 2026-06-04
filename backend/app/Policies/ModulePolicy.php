<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Module;

class ModulePolicy
{
    public function before(User $user)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return null;
    }

     public function viewAny(?User $user)
    {
        return true;
    }

    public function update(User $user, Module $module)
    {
        return $user->hasRole('instructor') && $module->course->instructor_id === $user->id;
    }

    public function delete(User $user, Module $module)
    {
        return $user->hasRole('instructor') && $module->course->instructor_id === $user->id;
    }

    public function view(User $user, Module $module)
    {
        $isInstructor = $user->hasRole('instructor') && $module->course->instructor_id === $user->id;
        $isEnrolled = $user->enrollments()->where('course_id', $module->course_id)->exists();

        return $isInstructor || $isEnrolled;
    }
}