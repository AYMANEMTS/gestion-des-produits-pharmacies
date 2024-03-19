<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\PharmacienOrderRequest;
use App\Models\PharmacienCommand;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PharmacienOrderController extends Controller
{
    public function storeOrder(PharmacienOrderRequest $pharmacienOrderRequest)
    {
        try {
            $validatedData = $pharmacienOrderRequest->validated();
            $validatedData['status'] = 'pending';
            $pharmacienCommand = PharmacienCommand::create($validatedData);
            $productsWithQty = $validatedData['productsWithQty'] ?? [];
            $totalCommand = 0;
            foreach ($productsWithQty as $productId => $qty) {
                $produit = Produit::find($productId);
                if (!$produit) {
                    throw new \Exception("Product with ID $productId not found");
                }
                $produit->qty -= $qty;
                $produit->save();
                $totalCommand += $qty * $produit->prix_vendre;
                $pharmacienCommand->produits()->attach($productId, ['qty' => $qty, 'total' => $qty * $produit->prix_vendre]);
            }
            $percentage = $pharmacienCommand->pharmacien->pharmacy->percentage / 100;
            $discount = $percentage * $totalCommand;
            $pharmacienCommand->total = $totalCommand - $discount;
            $pharmacienCommand->save();
            DB::commit();
            return apiResponse(['status'=>true,'message'=>'command created successfully']);
        }catch (\Exception $e){
            DB::rollBack();
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function showOrders()
    {
        $commandsClient = PharmacienCommand::with(['produits','produits.category','pharmacien','pharmacien.pharmacy'])->get();
        return apiResponse($commandsClient);
    }
}
