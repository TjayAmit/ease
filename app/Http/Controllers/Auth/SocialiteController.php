<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SocialiteController extends Controller
{
    public function redirect(string $provider)
    {
        $this->validateProvider($provider);

        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider)
    {
        $this->validateProvider($provider);

        $user = Socialite::driver($provider)->user();

        $existingUser = User::where('email', $user->email)->first();

        if (!$existingUser) {
            return redirect()->route('login')->withErrors([
                'email' => 'Your account is not registered.',
            ]);
        }

        Auth::login($existingUser);

        return redirect()->route('dashboard');
    }

    protected function validateProvider(string $provider): void
    {
        if (! in_array($provider, ['google'])) {
            throw new \Exception('Invalid provider');
        }
    }
}