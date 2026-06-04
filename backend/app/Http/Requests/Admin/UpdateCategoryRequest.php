<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'name'   => ['required', 'string', 'max:100'],
        'slug'   => ['required', 'string', 'max:20',
                     Rule::unique('categories', 'slug')->ignore($this->route('category'))],
        'status' => ['sometimes', 'string', 'in:active,inactive'],
    ];
    }
}
