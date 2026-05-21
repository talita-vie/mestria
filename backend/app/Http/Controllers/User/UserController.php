<?php

namespace App\Http\Controllers\User;

use App\Actions\DeleteUserAccountAction;
use App\Actions\UpdatePasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Requests\User\DeleteAccountRequest;  
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function updatePassword(UpdatePasswordRequest $request, UpdatePasswordAction $action): JsonResponse
    {
        $action->execute(
            user: $request->user(),
            newPassword: $request->validated('password')
        );

        return response()->json(['message' => 'Senha atualizada com sucesso.']);
    }

    public function deleteAccount(DeleteAccountRequest $request, DeleteUserAccountAction $action): JsonResponse
    {
        
        $action->execute($request->user());

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Conta excluída com sucesso.']);
    }
}