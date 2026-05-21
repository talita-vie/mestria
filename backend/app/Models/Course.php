<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'instructor_id',
        'category_id',
        'title',
        'description',
        'thumbnail',
        'status',
        'approved_by',
        'approved_at',
        'submitted_for_review_at'
    ];

    public function instructor()
    {
        return $this->belongsTo(InstructorProfile::class, 'instructor_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}