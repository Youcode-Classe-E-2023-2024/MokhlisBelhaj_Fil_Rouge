<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
       /**
     * Display a listing of all comments.
     */
    public function index(Article $article)
    {
        $comments = $article->Comment()->with('user')->orderBy('created_at')->get();
        return response()->json($comments);
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request)
    {
  
        $validated = $request->validate([
            'article_id' => 'required|integer',
            'comment' => 'required|string|max:500',
        ]);

        $user= auth()->user();
    $comment = Comment::create([
        'user_id' => $user->id,
        'article_id' => $validated['article_id'],
        'comments' => $validated['comment']
    ]);

        return response()->json($comment, 201); // Created status
    }
     public function show(Comment $comment){
        return response()->json($comment);
     }

  

    /**
     * Update the specified comment.
     */
    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:500',
        ]);

        $comment->update([
            'comments'=>$validated['comment'],
        ]);

        return response()->json($comment);
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
        $user = auth()->user();
        if ($user->id === $comment->user_id) {
        $comment->delete();
        return response()->json(null, 204); 
    }
    return response()->json(404);
    }
}
