<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Lesson;

class LessonPolicy
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

    public function update(User $user, Lesson $lesson)
    {
        return $user->hasRole('instructor') && $lesson->module->course->instructor_id === $user->id;
    }

    public function delete(User $user, Lesson $lesson)
    {
        return $user->hasRole('instructor') && $lesson->module->course->instructor_id === $user->id;
    }

    public function view(User $user, Lesson $lesson)
    {
        $course = $lesson->module->course;

        if ($user->hasRole('instructor') && $course->instructor_id === $user->id) {
            return true;
        }
        
        $isEnrolled = $user->enrollments()->where('course_id', $course->id)->exists();

        return $course->status === 'published' && $isEnrolled;
    }
}
