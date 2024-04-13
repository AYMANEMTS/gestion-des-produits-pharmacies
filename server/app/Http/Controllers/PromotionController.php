<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromotionRequest;
use App\Models\Produit;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index()
    {
        return apiResponse(Promotion::with('products')->get());
    }
    public function showPromo(string $id)
    {
        $promo = Promotion::with('products')->findOrFail($id);
        return apiResponse($promo);
    }
    public function store(PromotionRequest $promotionRequest)
    {
        try {
            $validatedData = $promotionRequest->validated();
            $promo = Promotion::create($validatedData);
            foreach ($validatedData['productsIds'] as $id){
                $product = Produit::findOrFail($id);
                if (!$product){
                    throw new \Exception("Product with ID ${id} not found");
                }
                $product->promotion_id = $promo->id;
                $product->save();
            }
            return apiResponse(['status'=>true,'message'=>'promotion created success','data'=>$promo]);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function toggleProductsInPromo(string $id, Request $request)
    {
        try {
            $promo = Promotion::findOrFail($id);
            $productsIds = $request->productsIds;
            $alreadyProductIds = $promo->products->pluck('id');
            $productsToAdd = array_diff($productsIds, $alreadyProductIds->toArray());
            $productsToRemove = array_diff($alreadyProductIds->toArray(), $productsIds);
            foreach ($productsToAdd as $productId) {
                $product = Produit::findOrFail($productId);
                $product->promotion_id = $promo->id;
                $product->save();
            }
            foreach ($productsToRemove as $productId) {
                $product = Produit::findOrFail($productId);
                $product->promotion_id = null;
                $product->save();
            }
            return apiResponse(['status'=>true,'message'=>'Products toggled successfully']);
        } catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }

}
