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

        $role = \Spatie\Permission\Models\Role::where('name', 'student')->first();
        if ($role) {
          $user->assignRole($role);
        }

        event(new Registered($user));

        return $user;
    }

    public function login(array $credentials): User
    {
        $user = User::where('email', $credentials['email'])->first();

        if ($user) {

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
        }

        $attempt = Auth::guard('web')->attempt(
            ['email' => $credentials['email'], 'password' => $credentials['password']],
            $credentials['remember'] ?? false
        );

        if (! $attempt) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        request()->session()->regenerate();

        return Auth::guard('web')->user();
    }

    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Coloca a instrução de destruição do cookie na fila
        Cookie::queue(Cookie::forget(config('session.cookie')));


    }
}