<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::first();

        if (!$course) {
            return;
        }

        Module::create([
            'course_id' => $course->id,
            'title' => 'Introdução',
            'position' => 1,
        ]);

        Module::create([
            'course_id' => $course->id,
            'title' => 'Fundamentos',
            'position' => 2,
        ]);

        Module::create([
            'course_id' => $course->id,
            'title' => 'Projeto Final',
            'position' => 3,
        ]);
    }
}