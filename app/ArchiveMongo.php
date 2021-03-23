<?php

namespace App;

use Moloquent;

class ArchiveMongo extends Moloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'archives';

    protected $fillable = [
        '_id', 'id_utente', 'nome', 'immagine',
    ];

    public function users()
    {
        return $this->belongsTo("App\UserMongo");
    }

    public function comics()
    {
        return $this->belongsToMany("App\ComicMongo", null, "id_raccolta", "id_fumetto");
    }
}
