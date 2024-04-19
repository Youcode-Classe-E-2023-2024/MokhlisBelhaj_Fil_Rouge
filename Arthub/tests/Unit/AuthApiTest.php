<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testUserCanRegister()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User1',
            'email' => 'testuser1@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
    
        $response->assertStatus(201);
    }

public function testUserCanLogin()
{
      // Créer un utilisateur pour le test
      $user = User::create([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => hash::make('password'),
    ]);

    // Envoyer une requête de connexion
    $response = $this->postJson('/api/login', [
        'email' => 'john@example.com',
        'password' => 'password',
    ]);

    // Vérifier que la requête a réussi
    $response->assertStatus(200);

    // Vérifier la structure de la réponse JSON
    $response->assertJsonStructure([
        'status',
        'message',
        'data' => [
            'token',
            'user' => [
                'id',
                'name',
                'email',
                // Ajoutez d'autres attributs d'utilisateur si nécessaire
            ],
        ],
    ]); 
    


       

}

// public function testUserCanRequestPasswordResetLink()
// {
//     $user = User::factory()->create();

//     $response = $this->postJson('/api/forgotPassword', [
//         'email' => $user->email,
//     ]);

//     $response->assertStatus(200);
// }


// public function testUserCanResetPassword()
// {
//     $user = User::factory()->create();
//     $token = Password::broker()->createToken($user);

//     $response = $this->postJson('/api/mot-de-passe/reset', [
//         'token' => $token,
//         'email' => $user->email,
//         'password' => 'new-password',
//         'password_confirmation' => 'new-password',
//     ]);

//     $response->assertStatus(200);
// }

// public function testUserCanLogout()
// {
//     $user = User::factory()->create();
//     $token = $user->createToken('auth_token')->plainTextToken;

//     $response = $this->withHeader('Authorization', 'Bearer ' . $token)
//                      ->postJson('/api/logout');

//     $response->assertStatus(200);
// }

}
