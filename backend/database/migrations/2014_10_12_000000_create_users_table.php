<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->longText('address');
            $table->longText('address2');
            $table->string('city');
            $table->integer('post_code');
            $table->string('state');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('purchases', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->float('amount');
            $table->timestamp('data_purchased');
        });
    }



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('purchases');
    }

}
