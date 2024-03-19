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
        Schema::create('pharmacien_command', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Pharmacien::class);
            $table->enum('status',["in progress","pending","delivered"]);
            $table->float('total',8,2);
            $table->date('date_livred_prevenu');
            $table->date('date_livred')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacien_command');
    }
};
