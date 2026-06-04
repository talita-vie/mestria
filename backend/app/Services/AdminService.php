<?php

namespace App\Services;

use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AdminService
{

    public function getAllUsers()
    {
        return User::with('roles')->paginate(15);
    }
    
    public function createUser(array $data): User
    {
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $role = \Spatie\Permission\Models\Role::where('name', $data['role'])->first();
        if ($role) {
            $user->assignRole($role);
        }

        event(new Registered($user));

        return $user;
    }

    public function updateUser(User $user, array $data): User
    {
        $user->name = $data['name'];
        $user->email = $data['email'];

    if (!empty($data['password'])) {
        $user->password = \Illuminate\Support\Facades\Hash::make($data['password']);
    }

    $user->save();

    $role = \Spatie\Permission\Models\Role::where('name', $data['role'])->first();
    if ($role) {
        $user->syncRoles([$role]);
    }

    $user->load('roles');
        

        return $user;
    }

    //Gestão de Categorias
    public function getAllCategories ()
    {
        return Category::paginate(15);
    }

      public function createCategory(array $data): Category
    {
        return Category::create([
            'name'   => $data['name'],
            'slug'   => $data['slug'],
            'status' => $data['status'] ?? 'active',
        ]);
    }

    public function updateCategory(Category $category, array $data): Category
    {
        $category->name   = $data['name'];
        $category->slug   = $data['slug'];
        $category->status = $data['status'] ?? $category->status;
        $category->save();

        return $category;
    }

}