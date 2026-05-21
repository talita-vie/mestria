<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules (): array {
        return [
            'token'    => ['required', 'string'],
            'email'    => ['required', 'email'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->uncompromised()]
        ];
    }

     public function messages(): array {
        return [
            'password.confirmed'  => 'A confirmação de senha não confere.',
            'password.min'        => 'A senha deve ter no mínimo :min caracteres.'
        ];
    }


    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Dados inválidos',
            'errors' => $validator->errors()
        ], 422)
    );
    }

}