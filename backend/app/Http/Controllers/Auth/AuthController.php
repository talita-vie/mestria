<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    // POST /api/auth/register
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());

        return response()->json([
            'message' => 'Conta criada com sucesso.',
            'user'    => new UserResource($user),
            ], 201);
    }


    // GET /api/auth/email/verify/{id}/{hash}
    public function verifyEmail(Request $request): JsonResponse
    {
        $user = User::findOrFail($request->route('id'));

        // Valida se o hash bate com o email do usuário
        if (! hash_equals(
            hash('sha256', $user->getEmailForVerification()),
            (string) $request->route('hash')
        )) {
            return response()->json(['message' => 'Link de verificação inválido.'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'E-mail já verificado.']);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return response()->json(['message' => 'E-mail verificado com sucesso.']);
    }

    // POST /api/auth/email/resend
    public function resendVerification(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'E-mail já verificado.'], 422);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'E-mail de verificação reenviado.']);
    }

    // POST /api/auth/login
    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->login($request->validated());

        return response()->json([
            'message' => 'Login realizado com sucesso.',
            'user'    => new UserResource($user),
        ]);
    }

    // POST /api/auth/logout  [auth:sanctum]
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request);

        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }

    // GET /api/user  [auth:sanctum]
    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => new UserResource($request->user())]);
    }
}
