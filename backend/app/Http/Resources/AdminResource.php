<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    /**
     * Transforma o recurso num array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'status'     => $this->status,
            'roles'      => $this->roles->pluck('name'),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}