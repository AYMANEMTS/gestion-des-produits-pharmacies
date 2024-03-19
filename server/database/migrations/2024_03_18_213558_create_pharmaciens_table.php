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
        Schema::create('pharmaciens', function (Blueprint $table) {
            $table->id();
            $table->string('username',100);
            $table->string('name',100)->nullable();
            $table->string('phone',15);
            $table->string('address',100)->nullable();
            $table->foreignIdFor(\App\Models\Pharmacy::class);
            $table->string('CNN',20);
            $table->string('email',100)->unique();
            $table->string('password');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmaciens');
    }
};
