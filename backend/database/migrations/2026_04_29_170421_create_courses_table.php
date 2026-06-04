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
        Schema::create('courses', function (Blueprint $table) {
        $table->id();

        $table->foreignId('instructor_id')
            ->constrained('users')
            ->restrictOnDelete();

        $table->foreignId('category_id')
            ->constrained()
            ->restrictOnDelete();

        $table->string('title', 200);
        $table->text('description')->nullable();
        $table->string('thumbnail')->nullable();

        $table->enum('status', [
            'draft',
            'pending_approval',
            'published', 
            'rejected',
            'archived'
            ])->default('draft');

        $table->foreignId('approved_by')
            ->nullable()
            ->constrained('users')
            ->nullOnDelete();

        $table->timestamp('approved_at')->nullable();
        $table->timestamp('submitted_for_review_at')->nullable();

        $table->timestamps();
        $table->softDeletes();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
