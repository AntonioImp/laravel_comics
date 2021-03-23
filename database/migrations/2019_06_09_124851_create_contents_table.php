<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->unsignedBigInteger('id_raccolta');
            $table->unsignedBigInteger('id_fumetto');

            $table->primary(['id_raccolta', 'id_fumetto']);

            $table->timestamps();

            $table->foreign('id_raccolta')->references('id')->on('archives')->onDelete('cascade');
            $table->foreign('id_fumetto')->references('id')->on('comics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contents');
    }
}
