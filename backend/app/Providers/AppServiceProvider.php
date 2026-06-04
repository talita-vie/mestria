<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword; 
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Carbon;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Category::class, \App\Policies\CategoryPolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Course::class, \App\Policies\CoursePolicy::class);
        \Illuminate\Support\Facades\Gate::policy(\App\Models\Module::class, \App\Policies\ModulePolicy::class);
         \Illuminate\Support\Facades\Gate::policy(\App\Models\Lesson::class, \App\Policies\LessonPolicy::class);

        VerifyEmail::createUrlUsing(function ($notifiable) {
        $backendUrl = URL::temporarySignedRoute (
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id'=> $notifiable->getKey(),
                'hash' => hash('sha256', $notifiable->getEmailForVerification())
            ]
        );

            $parsed    = parse_url($backendUrl);
            $id        = $notifiable->getKey();
            $hash      = hash('sha256', $notifiable->getEmailForVerification());
 
            parse_str($parsed['query'] ?? '', $queryParams);
 
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
 
            $params = http_build_query([
                'id'        => $id,
                'hash'      => $hash,
                'expires'   => $queryParams['expires'] ?? '',
                'signature' => $queryParams['signature'] ?? '',
            ]);
 
            return $frontendUrl . '/conta-verificada?' . $params;
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return config('app.frontend_url') . '/reset-senha?token=' . $token . '&email=' . urlencode($user->email);
        });
}

}