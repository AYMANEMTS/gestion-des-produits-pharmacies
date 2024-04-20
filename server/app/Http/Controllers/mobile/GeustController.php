<?php

namespace App\Http\Controllers\mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produit;

class GeustController extends Controller
{
    public function getProducts()
    {
        $products = Produit::with(['category','promotion','fourniseur'])->orderBy('created_at','desc')->get();
        $products->each(function ($product) {
            $product->prix_finale = $product->finalPrice();
        });
        return apiResponse(['status' => true, 'data' => $products]);
    }
}
