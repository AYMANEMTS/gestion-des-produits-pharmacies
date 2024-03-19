<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClentOrderRequest;
use App\Models\ClientCommand;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientOrderController extends Controller
{
    public function storeOrder(ClentOrderRequest $clentOrderRequest)
    {
        try {
            $validatedData = $clentOrderRequest->validated();
            $validatedData['status'] = 'pending';
            $clientCommnd = ClientCommand::create($validatedData);
            $productsWithQty = $validatedData['productsWithQty'] ?? []; // Assuming productsWithQty is an array of product IDs with corresponding qty
            $totalCommand = 0;
            foreach ($productsWithQty as $productId => $qty) {
                $produit = Produit::find($productId);
                if (!$produit) {
                    throw new \Exception("Product with ID $productId not found");
                }
                $produit->qty -= $qty;
                $produit->save();
                $totalCommand += $qty * $produit->prix_vendre;
                $clientCommnd->produits()->attach($productId, ['qty' => $qty, 'total' => $qty * $produit->prix_vendre]);
            }
            $clientCommnd->total = $totalCommand;
            $clientCommnd->save();
            DB::commit();
            return apiResponse(['status'=>true,'message'=>'command created successfully']);
        }catch (\Exception $e){
            DB::rollBack();
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function showOrders()
    {
        $commandsClient = ClientCommand::with(['produits','produits.category','client'])->get();
        return apiResponse($commandsClient);
    }
}
