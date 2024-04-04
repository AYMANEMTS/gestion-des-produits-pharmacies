<?php

use App\Models\Produit;
use Illuminate\Support\Facades\Storage;

if (!function_exists('apiResponse')) {
    function apiResponse($data = [], $statusCode = 200, $headers = [])
    {
        return response()->json($data, $statusCode, $headers);
    }
}

if (!function_exists('saveImage')) {
    function saveImage($image)
    {
        $pathName = time() . '_' . $image->getClientOriginalName();
        $image->storeAs('public/products_images', $pathName);
        return $pathName;
    }
}

if (!function_exists('updateImage')) {
    function updateImage($oldImagePath, $newImage)
    {
        if ($newImage !== null) {
            if (Storage::exists('public/products_images/' . $oldImagePath)) {
                Storage::delete('public/products_images/' . $oldImagePath);
            }
            $pathName = time() . '_' . $newImage->getClientOriginalName();
            $newImage->storeAs('public/products_images', $pathName);
            return $pathName;
        }
        return $oldImagePath;
    }
}
if (!function_exists('calculTotalCartItems')){
    function calculTotalCartItems($data,$order)
    {
        $totalOrder = 0;
        foreach ($data as $item) {
            $produit = Produit::find($item['id']);
            if (!$produit) {
                throw new \Exception("Product with ID ".$item['id']." not found");
            }
            $produit->qty -= $item['qty'];
            $produit->save();
            $promo = null;
            if ($produit->promotion !== null){
                $promo = $produit->promotion->pourcentage;
                $discount = ($promo / 100) * $produit->prix_vendre;
                $produitTotal = $produit->prix_vendre - $discount;
                $produitTotal = $produitTotal * $item['qty'];
            }else{
                $produitTotal = $item['qty'] * $produit->prix_vendre;
            }
            $totalOrder += $produitTotal;
            $order->produits()->attach($item['id'], ['qty' => $item['qty'], 'total' => $produitTotal,'promo'=>$promo.'%']);
        }
        $order->total = $totalOrder;
        $order->save();
    }
}
