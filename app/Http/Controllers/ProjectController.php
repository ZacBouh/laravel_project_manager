<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index() {
        $users= User::all();
        return Inertia::render('Project/Index', [
            'clients' => $users
        ]);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'title' => 'required|string|max:250',
            'description' => 'required|string|max:10000',
            'status' => ['required', Rule::in(['en attente', 'à venir', 'terminé', 'annulé'])],
            'owner_id' => 'required|exists:App\Models\User,id',
            'client_id' => 'required|exists:App\Models\User,id',
        ]);

        $project = Project::create($validatedData);
        return redirect(route('project.index', absolute: false))->with('message', "Project created with id : $project->id" );
    }

}
