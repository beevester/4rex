<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchases extends Model
{
    protected $fillable = [
        'email', 'currency', 'amount'
    ];
}
