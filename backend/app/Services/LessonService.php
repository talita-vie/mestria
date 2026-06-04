<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\Module;

class LessonService
{
    /**
     * Cria uma nova aula em um módulo.
     */
    public function createLesson(
        Module $module,
        array $data
    ): Lesson {
        return $module->lessons()->create($data);
    }

    /**
     * Atualiza uma aula.
     */
    public function updateLesson(
        Lesson $lesson,
        array $data
    ): Lesson {
        $lesson->update($data);

        return $lesson->fresh();
    }

    /**
     * Remove uma aula.
     */
    public function deleteLesson(
        Lesson $lesson
    ): void {
        $lesson->delete();
    }
}