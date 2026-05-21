<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class PasswordResetController extends Controller
{
    // POST /api/auth/forgot-password
    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // Sempre retorna 200 — nunca revela se o email existe ou não
        return response()->json([
            'message' => 'Se este e-mail estiver cadastrado, você receberá as instruções em breve.',
        ]);
    }

    // POST /api/auth/reset-password
    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password'       => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                // Revoga todos os tokens Sanctum existentes
                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Token inválido ou expirado.',
            ], 422);
        }

        return response()->json([
            'message' => 'Senha redefinida com sucesso.',
        ]);
    }
}