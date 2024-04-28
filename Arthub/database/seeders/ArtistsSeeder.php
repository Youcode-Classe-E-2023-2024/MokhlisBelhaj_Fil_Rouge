<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class ArtistsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->count(6)->create();
    }
}
