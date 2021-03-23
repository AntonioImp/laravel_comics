<?php

namespace App;

use Moloquent;

class ComicMongo extends Moloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'comics';

    protected $fillable = [
        'id', 'nome', 'copertina', 'uscita', 'descrizione', 'capitolo', 'volume',
    ];

    public function archives()
    {
        return $this->belongsToMany("App\ArchiveMongo", null, "id_fumetto", "id_raccolta");
    }
}
