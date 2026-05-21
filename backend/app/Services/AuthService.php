<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Cookie;

class AuthService
{
    public function register(array $data): User
    {
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $role = \App\Models\Role::where('name', 'aluno')->first();
        if ($role) {
          $user->roles()->attach($role->id);
        }

        event(new Registered($user));

        return $user;
    }

    public function login(array $credentials): User
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        if (! $user->hasVerifiedEmail()) {
            throw ValidationException::withMessages([
                'email' => ['Confirme seu email antes de fazer login.'],
            ]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => ['Esta conta está suspensa ou desativada.'],
            ]);
        }

        Auth::login($user, $credentials['remember'] ?? false);

        request()->session()->regenerate();

        return $user;
    }

    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        // Coloca a instrução de destruição do cookie na fila
        Cookie::queue(Cookie::forget(config('session.cookie')));


    }
}