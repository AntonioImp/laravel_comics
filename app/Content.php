<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $primaryKey = ['user_id', 'stock_id'];
    public $incrementing = false;
}
