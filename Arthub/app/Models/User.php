<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'imageUrl',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function roles() {
        return $this->belongsToMany(Role::class,'role_user');
    }
           // Méthode pour assigner une permission à un rôle
       public function giveRolesTo($role) {
        if (is_int($role)) {
            $role = Role::findOrFail($role);
        } 
        elseif (is_string($role)) {
            $role = Role::where('name', $role)->first();
        }
            $this->roles()->attach($role);
    }
    public function hasRole($role) {
        return $this->roles()->where('id', $role->id)->exists();
    }
    public function removeRoleFrom($role) {
        $this->roles()->detach($role);
    }
   

    
}
