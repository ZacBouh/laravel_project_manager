<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ClientController extends Controller
{
    public function getClients()
    {
        $clients = User::all();
        return  response()->json($clients);
    }
}
