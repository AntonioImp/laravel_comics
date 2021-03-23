<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    public function user($us)
    {
        $res = User::where('username', $us)->get();
        if($res == '[]')
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
}
