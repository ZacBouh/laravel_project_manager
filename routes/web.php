<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// PROJECTS
Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/projects', [ProjectController::class, 'index'])->name('project.index');
    Route::post('/projects', [ProjectController::class, 'store'])->name('project.store');
    Route::delete('/projects', [ProjectController::class, 'destroy'])->name('project.destroy');
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/api/clients', [ClientController::class, 'getClients'])->name('api.client.get');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
