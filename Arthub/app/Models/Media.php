<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'mediaUrl',
         'type',
         'articles_id'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class, 'articles_id');
    }
}
