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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('status',['en attente', 'à venir', 'terminé', 'annulé'])->default('en attente')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->unsignedBigInteger('owner_id');
            $table->unsignedBigInteger('client_id');

            $table->foreign('owner_id')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('client_id')->references('id')->on('users')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
