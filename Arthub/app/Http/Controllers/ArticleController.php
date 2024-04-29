<?php
namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $articles = Article::with('user', 'Categorie')
    ->where('status', true)
    ->with('user','Categorie')->get();
    $articles->each(function ($article) {
        $article->setRelation('media', $article->media->take(1));
    });    
    return response()->json($articles);
}
public function articleHome()
{
    $articles = Article::with('user', 'Categorie')
        ->where('status', true)
        ->orderBy('created_at', 'desc') 
        ->take(4) 
        ->get();

    $articles->each(function ($article) {
        $article->setRelation('media', $article->media->take(1));
    });

    return response()->json($articles);
}

    public function allArticle(){
        $articles = Article::with('user', 'Categorie','media')
        ->get();
            
        return response()->json($articles);
    }


    public function userArticles(User $user)
    {
        $articles = $user->articles()->where('status', true)->get(); 
        $articles->load('media', 'categorie');
    
        return response()->json($articles); 
    }
    public function mostActiveArticle()
    {
        // Obtenir le nombre de commentaires et de notes pour chaque article
        $mostActiveArticle = Article::withCount(['Comment', 'ratings'])
            ->orderByRaw('Comment_count + ratings_count DESC')
            ->with('media','user', 'categorie')
            ->first();


        return response()->json([
            'mostActiveArticle' => $mostActiveArticle,
        ]);
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
            'created_at' => now(),
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
        $article->load('user', 'media', 'categorie');
        // Return the response as a JSON object
        return response()->json($article);
    }
    public function myArticle(){
        $user = auth()->user();
        $articles = Article::where('user_id', $user->id)->get();
        $articles->load('media', 'categorie');
        return response()->json($articles);
    }

    public function statusAction(Article $article , Request $request){
        $validation = validator::make($request->all(),
        ['status' => 'required|boolean']
        );
        if ($validation->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validation->errors(),
            ], 422);
        }
        $article->update([
            'status'=> $request->status,
        ]);
        return response()->json(['message' => 'status updated successfully'], 200);
    }
    /**
 * Update the specified resource in storage.
 */
public function update(Request $request, Article $article)
{
    $user = auth()->user();

    if ($user->id !== $article->user_id) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'required|string',
        'description' => 'required|string',
        'category_id' => 'required|exists:categories,id',
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

    $article->update([
        'title' => $request->title,
        'description' => $request->description,
        'category_id' => $request->category_id,
        'status'=> false,
    ]);

    $article->media()->delete();

    foreach ($request->mediaData as $media) {
        $article->media()->create([
            'mediaUrl' => $media['mediaUrl'],
            'type' => $media['resourceType'],
        ]);
    }

    return response()->json(['message' => 'Article updated successfully'], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $user = auth()->user();

        if ($user->id !== $article->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
            // Utilisez le code d'erreur 403 pour indiquer un accès non autorisé
        }
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}
