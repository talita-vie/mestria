<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $instructor = User::role('instructor')->first();

        $category = Category::first();

        Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title' => 'Laravel para Iniciantes',
            'description' => 'Curso introdutório de Laravel',
            'status' => 'published',
            'approved_by' => $instructor->id,
            'approved_at' => now(),
        ]);

        Course::create([
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'title' => 'React Completo',
            'description' => 'Curso de React',
            'status' => 'draft',
        ]);
    }
}