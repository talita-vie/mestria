<?php

namespace App\Actions;

use App\Models\User;

class DeleteUserAccountAction
{
    public function execute(User $user): void 
    {
        $user->tokens()->delete();

        $user->delete();
    }
}