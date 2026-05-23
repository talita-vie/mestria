<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule; 

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array {
        return [
            'name' => [
                'required', 
                'string', 
                'max:150'
            ],
            'email' => [
                'required', 
                'email', 
                Rule::unique('users', 'email')->ignore($this->route('user')) 
            ],
            'role' => ['required', 'string', 'exists:roles,name'],
            'password' => ['nullable', 'string', 'confirmed', Password::min(8)->uncompromised()]
        ];
    }
    
    public function messages(): array {
        return [
            'email.unique'        => 'Este e-mail já está em uso por outra conta.',
            'role.exists'         => 'O papel selecionado é inválido.',
            'password.confirmed'  => 'A confirmação de senha não confere.',
            'password.min'        => 'A senha deve ter no mínimo :min caracteres.'
        ];
    }
    
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Dados inválidos.',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}