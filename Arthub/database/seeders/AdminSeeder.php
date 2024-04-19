<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([ 'name' => 'admin',
       'email' => 'admin@admin.com',
       'email_verified_at' => now(),
       'password' => Hash::make(env('ADMIN_password')),
       "imageUrl" => "https://th.bing.com/th/id/OIP.qXIpB6jVidOC5ROOSO3CtwHaHa?rs=1&pid=ImgDetMain"
    ])->giveRolesTo('admin');
    }
}
