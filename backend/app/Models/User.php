<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;



class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles , SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // 🔗 Instructor Profile (1:1)
    public function instructorProfile()
    {
        return $this->hasOne(InstructorProfile::class);
    }

    // 🔗 Courses by instructor
    public function instructorCourses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    // 🔗 Enrollments
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    // 🔗 Courses via enrollments
    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollments');
    }

    // 🔗 Favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function favoriteCourses()
    {
        return $this->belongsToMany(Course::class, 'favorites');
    }

    // 🔗 Progress
    public function lessonProgress()
    {
        return $this->hasMany(LessonUserProgress::class);
    }

    // 🔗 Certificates
    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    // 🔗 Quiz Attempts
    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
    
}