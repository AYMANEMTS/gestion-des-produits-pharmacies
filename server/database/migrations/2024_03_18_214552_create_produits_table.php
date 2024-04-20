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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->float('prix_achat',8,2);
            $table->float('prix_vendre',8,2);
            $table->float('prix_finale',8,2)->nullable();
            $table->bigInteger('qty');
            $table->foreignIdFor(\App\Models\Fourniseur::class);
            $table->foreignIdFor(\App\Models\Category::class)->nullable();
            $table->date('date_fab')->nullable();
            $table->date('date_exp')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
