<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\Module;

class LessonService
{
    /**
     * Cria uma nova aula em um módulo.
     */
    public function createLesson( Module $module, array $data): Lesson 
    
    {
        $nextPosition = (int) $module->lessons()->max('position') + 1;
        $data['position'] = $nextPosition;

        return $module->lessons()->create($data);
    }

    /**
     * Atualiza uma aula.
     */
    public function updateLesson(Lesson $lesson, array $data): Lesson 
    {
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

     public function reorderLessons(Module $module, array $items): void
    {
        $validIds = $module->lessons()->pluck('id')->flip();
 
        foreach ($items as $item) {
            if (!isset($validIds[$item['id']])) {
                continue;
            }
 
            Lesson::where('id', $item['id'])
                ->update(['position' => $item['position']]);
        }
    }
}