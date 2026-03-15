<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Models\User;

use App\Http\Controllers\Auth\SocialiteController;

use App\Http\Controllers\Dashboard\DashboardController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('users', function () {
        return inertia('users/index', [
            'users' => User::all(),
        ]);
    })->name('users.index');

    Route::get('roles', function () {
        return inertia('roles/index');
    })->name('roles.index');
});

Route::middleware(['guest'])->group(function () {
    Route::get('auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('socialite.redirect');
    Route::get('auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');
});

require __DIR__.'/settings.php';
