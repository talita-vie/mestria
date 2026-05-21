<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')->constrained()->cascadeOnDelete();

        $table->foreignId('course_id')
            ->nullable()
            ->constrained()
            ->nullOnDelete();

        $table->string('course_title', 200);
        $table->string('instructor_name', 150);
        $table->string('file_path');

        $table->timestamp('issued_at')->useCurrent();

        $table->unique(['user_id', 'course_id']);
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
