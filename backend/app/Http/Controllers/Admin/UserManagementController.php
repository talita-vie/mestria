<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Services\AdminService;
use App\Http\Resources\AdminResource;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class UserManagementController extends Controller
{
     public function __construct(
        private readonly AdminService $adminService
    ) {}


        public function index(): JsonResponse
    {
        $users = $this->adminService->getAllUsers();
        
        return AdminResource::collection($users)->response()->setStatusCode(200);
    }

        public function show(User $user): JsonResponse
    {
        $user->load('roles'); 
        
        return response()->json(new AdminResource($user), 200);
    }
 
    public function createUser(StoreUserRequest $request): JsonResponse
    {
        $user = $this->adminService->createUser($request->validated());

        return response()->json([
            'message' => 'Conta criada com sucesso.',
            'user'    => new AdminResource($user),
            ], 201);
    }

    public function updateUser(UpdateUserRequest $request, User $user): JsonResponse
    {
        $updatedUser = $this->adminService->updateUser($user, $request->validated());

        return response()->json([
            'message' => 'Conta modificada com sucesso.',
            'user'    => new AdminResource($updatedUser),
            ], 200);
    }

    public function destroyUser(User $user): JsonResponse
    {
        $user->delete(); 
        
        return response()->json(['message' => 'Conta desativada com sucesso.'], 200);
    }
}
