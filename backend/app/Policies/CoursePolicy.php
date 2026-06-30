<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Course;

class CoursePolicy
{
    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Course $course)
    {
        // Alunos só veem cursos publicados
        if ($course->status === 'published') {
            return true;
        }

        // Instrutor vê seu próprio curso mesmo em rascunho
        if ($user && $user->hasRole('instructor') && $course->instructor_id === $user->id) {
            return true;
        }

        return false;
    }

    public function create(User $user)
    {
        return $user->hasRole('instructor');
    }

    public function update(User $user, Course $course)
    {
        return $user->hasRole('instructor') 
        && $course->instructor_id === $user->id
           && (
            $course->status === 'draft' || $course->status === 'rejected'
        );     
    }

    public function delete(User $user, Course $course)
    {
        return $user->hasRole('instructor') && $course->instructor_id === $user->id;
    }

        public function submit(User $user, Course $course)
    {
        return $course->instructor_id === $user->id
            && $course->status === 'draft';
    }
}
