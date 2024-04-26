<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id', 
        'categories_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class); 
    }

    public function Categorie()
    {
        return $this->belongsTo(Categorie::class); 
    }

    public function media()
    {
        return $this->hasMany(Media::class, 'articles_id');
    }
}
