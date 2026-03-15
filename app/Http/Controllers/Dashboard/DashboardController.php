<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => $this->statsOverview(),
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']),
            'chart_data' => $this->chart(),
        ]);
    }

    protected function statsOverview(): array
    {
        return [
                'total_users' => User::count(),
                'new_users_today' => User::whereDate('created_at', today())->count(),
                'peak_requests' => '1,204',
                'active_sessions' => random_int(10, 50)
        ];
    }

    protected function chart(): array
    {
        return  [
            [ 'month' => 'Jan', 'sales' => 200],
            [ 'month' => 'Feb', 'sales' => 300],
            [ 'month' => 'Mar', 'sales' => 250],
            [ 'month' => 'Apr', 'sales' => 400],
            [ 'month' => 'May', 'sales' => 350],
            [ 'month' => 'Jun', 'sales' => 300],
            [ 'month' => 'Jul', 'sales' => 250],
            [ 'month' => 'Aug', 'sales' => 300],
            [ 'month' => 'Sep', 'sales' => 350],
            [ 'month' => 'Oct', 'sales' => 300],
            [ 'month' => 'Nov', 'sales' => 250],
            [ 'month' => 'Dec', 'sales' => 500],
        ];
    }
}