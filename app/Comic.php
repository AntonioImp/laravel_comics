<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    public function archives()
    {
        return $this->belongsToMany("App\Archive", "contents", "id_fumetto", "id_raccolta");
    }
}
