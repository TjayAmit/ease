<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\{
    Permission,
    Role
};
use App\Models\User;


class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_permissions = [
            'create role',
            'read role',
            'update role',
            'delete role',
            'create permission',
            'read permission',
            'update permission',
            'delete permission',
            'create user',
            'read user',
            'update user',
            'delete user',
        ];

        foreach ($role_permissions as $role_permission) {
            Permission::create([
                'name' => $role_permission,
                'guard_name' => 'web',
            ]);
        }

        $admin_role = Role::create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $admin_role->givePermissionTo($role_permissions);

        $admin_user = User::create([
            'name' => 'Admin',
            'email' => 'tristanjayamit0813@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $admin_user->assignRole($admin_role);
    }
}
