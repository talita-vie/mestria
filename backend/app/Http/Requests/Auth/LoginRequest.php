<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class LoginRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }
    public function rules(): array {
        return [
             'email'    => ['required', 'email'],
             'password' => ['required', 'string'],
        ];
    }
   
    protected function failedValidation(Validator $validator): void {
        throw new HttpResponseException(
            response()->json(['message' =>'Dados inválidos.', 'errors' =>
            $validator->errors()], 422)
            );
    }
   
}