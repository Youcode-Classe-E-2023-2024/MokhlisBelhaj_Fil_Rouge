<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories',
        ]);
        if ($validation->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validation->errors(),
            ], 403);
        }
        $Categorie = Categorie::create([
            'name' => $request->name,
        ]);



        return response()->json([
            'message' => 'Category created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categorie =  Categorie::find($id);
        return response()->json($categorie);
    }


    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        if (!$categorie) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Category not found',
            ], 404);
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories,name,' . $id,
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validation->errors(),
            ], 403);
        }

        // Update category
        $categorie->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Category updated successfully',
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json([
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
