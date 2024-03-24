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
        Schema::create('pharmacien_command_produits', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\PharmacienCommand::class);
            $table->foreignIdFor(\App\Models\Produit::class);
            $table->bigInteger('qty');
            $table->float('total',8,2);
            $table->string('promo')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacien_command_produits');
    }
};
