<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class RateLimiterServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        RateLimiter::for('resend-verify', function (Request $request) {
            return Limit::perMinute(1)
                ->by($request->user()?->id ?: $request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Muitas tentativas de reenvio. Aguarde antes de tentar novamente.',
                    ], 429);
                });
        });

        RateLimiter::for('register', function (Request $request) {
            return [
                Limit::perMinute(3)
                    ->by('register_ip:' . $request->ip())
                    ->response(function () {
                        return response()->json([
                            'message' => 'Muitas tentativas de cadastro. Tente novamente em alguns minutos.'
                        ], 429);
                    }),
            ];
        });

        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input('email', '');

            return [
                Limit::perMinute(5)
                    ->by('login_email:' . mb_strtolower($email))
                    ->response(function () {
                        return response()->json([
                            'message' => 'Muitas tentativas para esta conta. Aguarde 1 minuto antes de tentar novamente.',
                        ], 429);
                    }),

                Limit::perMinute(10)
                    ->by('login_ip:' . $request->ip())
                    ->response(function () {
                        return response()->json([
                            'message' => 'Muitas tentativas de login. Aguarde 1 minuto antes de tentar novamente.',
                        ], 429);
                    }),
            ];
        });

        RateLimiter::for('forgot', function (Request $request) {
          $email = (string) $request->input('email', '');
            return [
                Limit::perMinute(1)
                    ->by('forgot_email:' .  mb_strtolower($email))
                    ->response(function () {
                        return response()->json([
                            'message' => 'Muitas tentativas de recuperação para esse email. Aguarde 1 minuto antes de tentar novamente.',
                        ], 429);
                    }),

                Limit::perMinute(1)
                    ->by('forgot_ip:' . $request->ip())
                    ->response(function () {
                        return response()->json([
                            'message' => 'Muitas tentativas de recuperação para esse email. Aguarde 1 minuto antes de tentar novamente.',
                        ], 429);
                    }),      
            ];
        });

        RateLimiter::for('reset', function (Request $request) {
            return Limit::perMinute(10)
                ->by('reset_ip:'. $request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Muitas tentativas de redefinição de senha. Aguarde 1 min antes de tentar novamente.',
                    ], 429);
                });
        });
    }
}