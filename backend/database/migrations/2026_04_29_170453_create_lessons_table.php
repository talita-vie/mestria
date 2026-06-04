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
        Schema::create('lessons', function (Blueprint $table) {
        $table->id();

        $table->foreignId('module_id')->constrained()->cascadeOnDelete();

        $table->string('title', 200);
        $table->enum('type', ['video', 'text', 'attachment']);
        $table->json('content')->nullable();

        $table->integer('position');

        $table->enum('status', ['draft', 'published', 'archived'])->default('draft');

        $table->timestamps();
        $table->softDeletes();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
