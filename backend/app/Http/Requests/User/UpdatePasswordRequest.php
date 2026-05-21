<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePasswordRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->uncompromised()]
        ];
    }

     public function messages(): array {

        return [
            'current_password.current_password' =>
                'A senha atual está incorreta.',

            'password.confirmed' =>
                'A confirmação de senha não confere.',
        ];
    }

     protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
            'message' => 'Dados inválidos',
            'errors' => $validator->errors()
        ], 422)
    );
    }
}
