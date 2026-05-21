<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password');

        DB::table('users')->insert([
            ['id' => 1, 'name' => 'Admin Principal', 'email' => 'admin@plataforma.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Carlos Silva', 'email' => 'carlos.silva@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Marta Souza', 'email' => 'marta.souza@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Joao Pedro', 'email' => 'joao.pedro@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Ana Clara', 'email' => 'ana.clara@email.com', 'password' => $password, 'status' => 'active', 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('role_user')->insert([
            ['user_id' => 1, 'role_id' => 1],
            ['user_id' => 2, 'role_id' => 2],
            ['user_id' => 3, 'role_id' => 2],
            ['user_id' => 4, 'role_id' => 3],
            ['user_id' => 5, 'role_id' => 3],
        ]);
    }
}