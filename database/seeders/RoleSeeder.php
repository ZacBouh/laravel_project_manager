<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $userPermissions = ['view_project'];
        $managerPermissions = [...$userPermissions, 'create_project'];
        $adminPermissions = [...$managerPermissions, 'delete_project'];


        // Permissions creation
        foreach($adminPermissions as $permission){
            Permission::findOrCreate($permission);
        }

        // ADMIN
        $admin = Role::findOrCreate('admin');
        $admin->givePermissionTo($adminPermissions);
        // MANAGER
        $manager = Role::findOrCreate('manager');
        $manager->givePermissionTo($managerPermissions);

        // USER
        $user = Role::findOrCreate('user');
        $user->givePermissionTo($userPermissions);


    }
}
