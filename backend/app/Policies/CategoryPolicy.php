<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;

class CategoryPolicy
{
    /**
     * Apenas administradores podem gerenciar categorias.
     */
    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }

    public function viewAny(?User $user)
    {
        return true; // Todos podem listar categorias
    }

    public function view(?User $user, Category $category)
    {
        return true; // Todos podem ver uma categoria
    }

    public function create(User $user)
    {
        return false; // Bloqueado por padrão, 'before' libera para admin
    }

    public function update(User $user, Category $category)
    {
        return false;
    }

    public function delete(User $user, Category $category)
    {
        return false;
    }
}
