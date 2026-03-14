<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Models\User;

use App\Http\Controllers\Auth\SocialiteController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia('dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'new_users_today' => User::whereDate('created_at', today())->count(),
                'peak_requests' => '1,204',
                'active_sessions' => random_int(10, 50)
            ],
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']),
        ]);
    })->name('dashboard');

    Route::get('users', function () {
        return inertia('users/index', [
            'users' => User::all(),
        ]);
    })->name('users.index');
});

Route::middleware(['guest'])->group(function () {
    Route::get('auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('socialite.redirect');
    Route::get('auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');
});

require __DIR__.'/settings.php';
