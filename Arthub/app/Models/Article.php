<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'categories_id',
        'status',
    ];

    /**
     * Get the user that owns this article.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the category this article belongs to.
     */
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categories_id');
    }

    /**
     * Get the media items associated with this article.
     */
    public function media()
    {
        return $this->hasMany(Media::class, 'articles_id');
    }

    /**
     * Get the ratings associated with this article.
     */
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
