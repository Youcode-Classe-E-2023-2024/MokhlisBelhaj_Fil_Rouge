<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
public function show(Article $article){
    $user = auth()->user();
    $article->ratings()->where('user_id', $user->id)->get();

return response()->json($article->ratings);
}



    /**
     * Store a new rating for an article.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
            'stars' => 'required|integer|min:1|max:5',
        ]);
    
        $article = Article::findOrFail($request->article_id);
    
        $rating = $article->ratings()->where('user_id', auth()->user()->id)->first();
    
        if ($rating) {
            $rating->stars = $request->stars;
            $rating->save();
    
            $message = 'Rating updated successfully';
        } else {
            $article->ratings()->create([
                'user_id' => auth()->user()->id,
                'stars' => $request->stars,
            ]);
    
            $message = 'Rating submitted successfully';
        }
    
        return response()->json(['message' => $message]);
    }


    /**
     * Get the average rating for a given article.
     *
     * @param int $articleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAverageRating(int $articleId)
    {
        $average = Rating::where('article_id', $articleId)->avg('stars');

        return response()->json(['average_rating' => round($average, 2)]);
    }
}
