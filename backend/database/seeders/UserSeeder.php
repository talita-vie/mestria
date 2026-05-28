<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password');

        $admin = User::create([
            'name' => 'Admin Principal', 'email' => 'admin@plataforma.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        $instructor1= User::create([
            'name' => 'Carlos Silva', 'email' => 'carlos.silva@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(),
        ]);
        $instructor1->assignRole('instructor');

        $instructor2= User::create([
            'name' => 'Marta Souza', 'email' => 'marta.souza@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 
        ]);
        $instructor2->assignRole('instructor');

        $student1= User::create([
            'name' => 'Carla Lemos', 'email' => 'carla.lemos@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(),
        ]);
        $student1->assignRole('student');

        $student2= User::create([
            'name' => 'Ana Clara', 'email' => 'ana.clara@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(),
        ]);
        $student2->assignRole('student');

        $student3= User::create([
            'name' => 'João Paulo', 'email' => 'joao.paulo@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(),
        ]);
        $student3->assignRole('student');
    }
}
