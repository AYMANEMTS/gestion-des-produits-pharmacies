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
        Schema::create('client_command', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Client::class);
            $table->enum('status',["in progress","pending","delivered"]);
            $table->float('total',8,2)->nullable();
            $table->date('date_livred_prevenu');
            $table->date('date_livred')->nullable();
            $table->string('name');
            $table->string('email');
            $table->string('address');
            $table->string('phone');
            $table->enum('payment_type',['online','cod']);
            $table->string('stripe_session_id')->unique()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_command');
    }
};
