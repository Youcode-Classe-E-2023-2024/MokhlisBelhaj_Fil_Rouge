<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategotieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pillarsOfArt = [
            'Architecture',
            'Sculpture',
            'Painting',
            'Music',
            'Literature',
            'Performing Arts',
            'Cinema'
        ];

  foreach ($pillarsOfArt as $pillar) {
            Categorie::create(['name' => $pillar]);
        }    
    }
}





