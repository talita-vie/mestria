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

            'module' => $this->whenLoaded('module', fn() => [
                'id'       => $this->module->id,
                'title'    => $this->module->title,
                'position' => $this->module->position,
            ]),

            'instructor' => $this->whenLoaded('module', function () {
                $instructor = $this->module->course->instructor ?? null;
                if (!$instructor) return null;
 
                return [
                    'name'   => $instructor->name,
                    'avatar' => $instructor->avatar ?? null,
                    'role'   => $instructor->headline ?? 'Instrutor',
                ];
            }),
        ];

    }
}