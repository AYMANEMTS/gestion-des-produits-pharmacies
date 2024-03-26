<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProduitRequest;
use App\Models\Produit;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Produit::with(['category','promotion','fourniseur'])->orderBy('created_at','desc')->paginate(9);
        return apiResponse(['status' => true,'data' => $product]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProduitRequest $produitRequest)
    {
        try {
            $data = $produitRequest->validated();
            if ($produitRequest->hasFile('image')){
                $imagePath = saveImage($produitRequest->file('image'));
                $data['image'] =$imagePath;
            }
            $product = Produit::create($data);
            return apiResponse(['status'=>true,'message'=>'produit created successfully']);
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
            $product = Produit::findOrFail($id);
            return apiResponse(['status'=>true,'data'=>$product]);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProduitRequest $produitRequest, string $id)
    {
        try {
            $data = $produitRequest->validated();
            $product = Produit::findOrFail($id);
            if ($product->image !== null && $produitRequest->hasFile('image')){
                $imagePath = updateImage($product->image,$produitRequest->file('image'));
                $data["image"] = $imagePath;
            }
            $product->update($data);
            return apiResponse(['status'=>true,'message'=>'produit updated successfully']);
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
            $product = Produit::findOrFail($id);
            $product->delete();
            return apiResponse(['status'=>true,'message'=>'produit deleted successfully']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
}
