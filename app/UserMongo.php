<?php

namespace App;

use Moloquent;

class UserMongo extends Moloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        '_id', 'username', 'nome', 'cognome', 'email', 'telefono', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function archives(){
        return $this->hasMany("App\ArchiveMongo");
    }
}
