<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    public function users()
    {
        return $this->belongsTo("App\User");
    }

    public function comics()
    {
        return $this->belongsToMany("App\Comic", "contents", "id_raccolta", "id_fumetto");
    }
}
