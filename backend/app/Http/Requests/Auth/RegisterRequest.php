<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }
    public function rules(): array {
        return [
            'name' => [
                'required', 
                'string', 
                'max:150'
            ],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->uncompromised()]
        ];
    }
    public function messages(): array {
        return [
            'email.unique'        => 'Não foi possível criar a conta com estes dados.',
            'password.confirmed'  => 'A confirmação de senha não confere.',
            'password.min'        => 'A senha deve ter no mínimo :min caracteres.'
        ];
    }
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json ([
            'message' => 'Dados inválidos.',
            'errors' => $validator->errors(),
        ], 422)
      );
    }

}
