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
            $validatedData['pharmacien_id'] = auth()->user()->id;
            $validatedData['date_livred_prevenu'] = '2028-12-08';
            $validatedData['payment_type'] = 'cod';
            $pharmacienCommand = PharmacienCommand::create($validatedData);
            $productsWithQty = $validatedData['productsWithQty'] ?? [];
            $totalCommand = 0;
            foreach ($productsWithQty as $item) {
                $produit = Produit::find($item['id']);
                if (!$produit) {
                    throw new \Exception("Product with ID {$item['id']} not found");
                }
                $produit->qty -= $item['qty'];
                $produit->save();
                $totalCommand += $item['qty'] * $produit->prix_vendre;
                $pharmacienCommand->produits()->attach($item['id'], ['qty' => $item['qty'], 'total' => $item['qty'] * $produit->prix_vendre]);
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
    public function getOrders()
    {
        $pharmacienOrders = PharmacienCommand::with(['produits','produits.category','produits.promotion','pharmacien'])->orderBy('created_at','desc')->get();
        return apiResponse($pharmacienOrders);
    }
}
