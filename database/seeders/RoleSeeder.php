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

        $userPermissions = ['view_project', 'set_project_owner'];
        $managerPermissions = [...$userPermissions, 'create_project'];
        $adminPermissions = [...$managerPermissions, 'delete_project'];


        // Permissions creation
        foreach($adminPermissions as $permission){
            Permission::findOrCreate($permission);
        }

        // ADMIN
        $admin = Role::findOrCreate('admin');
        $admin->syncPermissions($adminPermissions);
        // MANAGER
        $manager = Role::findOrCreate('manager');
        $manager->syncPermissions($managerPermissions);

        // USER
        $user = Role::findOrCreate('user');
        $user->syncPermissions($userPermissions);


    }
}
