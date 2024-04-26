<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('media')->get();
        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id', // Assuming categories table has an 'id' column
            'mediaData' => 'required|array',
            'mediaData.*.mediaUrl' => 'required|string',
            'mediaData.*.resourceType' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validator->errors(),
            ], 422);
        }

        $article = $user->articles()->create([
            'title' => $request->title,
            'description' => $request->description,
            'categories_id' => $request->category_id,
        ]);

        foreach ($request->mediaData as $media) {
            $article->media()->create([
                'mediaUrl' => $media['mediaUrl'],
                'type' => $media['resourceType'],
            ]);
        }

        return response()->json(['message' => 'Article created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}
