<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\InstructorProfile;
use Illuminate\Database\Seeder;

class InstructorProfileSeeder extends Seeder
{
    public function run(): void
    {
        $instructor = User::role('instructor')->first();

        InstructorProfile::firstOrCreate(
            [
                'user_id' => $instructor->id,
            ],
            [
                'specialty' => 'Desenvolvimento Web',
                'bio' => 'Instrutor de Front-end',
                'linkedin' => 'https://linkedin.com/in/instrutor',
            ]
        );
    }
}