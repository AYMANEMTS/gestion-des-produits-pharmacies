<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClentOrderRequest;
use App\Models\ClientCommand;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ClientOrderController extends Controller
{
    public function storeOrder(ClentOrderRequest $clentOrderRequest)
    {
        try {
            $validatedData = $clentOrderRequest->validated();
            $validatedData['status'] = 'pending';
            $validatedData["date_livred_prevenu"] = "2028-12-08";
            $validatedData['payment_type'] = 'cod';
            $validatedData['client_id'] = auth()->user()->id;
            $clientCommnd = ClientCommand::create($validatedData);
            $productsWithQty = $validatedData['productsWithQty'] ?? [];
            calculTotalCartItems($productsWithQty,$clientCommnd);
            DB::commit();
            return apiResponse(['status'=>true,'message'=>'command created successfully','order'=>$clientCommnd]);
        }catch (\Exception $e){
            DB::rollBack();
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function getOrders()
    {
        $commandsClient = ClientCommand::with(['produits','produits.category','produits.promotion','client'])->orderBy('created_at','desc')->get();
        return apiResponse($commandsClient);
    }
    public function showOrder(string $id)
    {
        try {
            $order = ClientCommand::with(['produits','produits.category','produits.promotion','client'])->findOrFail($id);
            return apiResponse(['status'=>true,'data'=>$order]);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function getClientOrders(Request $request)
    {
        try {
            if (auth()->guard('client')->check()){
                $client = auth()->guard('client')->user();
                $orders = ClientCommand::with(['produits', 'produits.category', 'produits.promotion', 'client'])
                    ->where('client_id', $client->id)
                    ->get();
                if ($orders->isEmpty()) {
                    return apiResponse(['status' => true, 'message' => 'No orders found for the client']);
                }
                return apiResponse(['status' => true, 'data' => $orders]);
            } else {
                return apiResponse('User not authenticated', 401);
            }
        } catch (\Exception $e) {
            return apiResponse(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }

}
