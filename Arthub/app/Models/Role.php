<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

   

    public function users() {
        return $this->belongsToMany(User::class,'role_user');
    }
    public function permissions() {
        return $this->belongsToMany(Permissions::class, 'permission_role');
    }

    // Méthode pour assigner une permission à un rôle
    public function givePermissionTo($permission) {
        $this->permissions()->attach($permission);
    }
    public function hasPermission($permission) {
        return $this->permissions()->where('id', $permission->id)->exists();
    }
    public function removePermissionFrom($permission) {
        $this->permissions()->detach($permission);
    }
    
    
}
