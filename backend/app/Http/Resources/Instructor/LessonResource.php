<?php

namespace App\Http\Resources\Instructor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
  /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'module_id' => $this->module_id,
            'title'     => $this->title,
            'type'     => $this->type,
            'content'  => $this->content,
            'position' => $this->position,
            'status'   => $this->status,
        ];

    }
}