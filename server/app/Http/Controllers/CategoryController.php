<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoy = new Category();
        return apiResponse([
            'categories'=>Category::with(['produits','produits.category','produits.promotion'])->get(),
            'topCategories'=>$categoy->getTopCategories(9)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $categoryRequest)
    {
        try {
            $data = $categoryRequest->validated();
            if ($categoryRequest->hasFile('image')){
                $imagePath = saveImage($categoryRequest->file('image'));
                $data['image'] = $imagePath;
            }
            $category = Category::create($data);
            return apiResponse(['status'=>true,'message'=>'category created successfully','data'=>$category]);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $cate = Category::findOrFail($id);
            return apiResponse(['success'=>true,'data'=>$cate],200);
        }catch (\Exception $e){
            return apiResponse(['success'=>false,'message'=>$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $categoryRequest, string $id)
    {
        try {
            $data = $categoryRequest->validated();
            $category = Category::findOrFail($id);
            if ($categoryRequest->hasFile('image') && $category->image !== null){
                $imagePath = updateImage($category->image,$categoryRequest->file('image'));
                $data['image'] = $imagePath;
            }
            $category->update($data);
            return apiResponse(['status'=>true,'message'=>'category updated successfully']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $cate = Category::findOrFail($id);
            $cate->delete();
            return apiResponse(['success'=>true,'message'=>'category deleted successfully'],200);
        }catch (\Exception $e){
            return apiResponse(['success'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function getTopCategories()
    {

    }
}
