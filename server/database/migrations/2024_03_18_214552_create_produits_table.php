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
            $table->string('name',200);
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->float('prix_achat',8,2);
            $table->float('prix_vendre',8,2);
            $table->bigInteger('qty');
            $table->foreignIdFor(\App\Models\Fourniseur::class);
            $table->foreignIdFor(\App\Models\Category::class);
            $table->date('date_fab');
            $table->date('date_exp');
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
