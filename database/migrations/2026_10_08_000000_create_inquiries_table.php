<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20)->index();          // partnership | contact
            $table->string('name');
            $table->string('email');
            $table->string('organization')->nullable();
            $table->string('country')->nullable();
            $table->string('website')->nullable();
            $table->string('interest')->nullable();       // partnership interest
            $table->string('topic', 30)->nullable();      // contact topic
            $table->text('message');
            $table->string('ip_address', 45)->nullable();
            $table->timestamp('emailed_at')->nullable();  // set when the notification email was sent
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
