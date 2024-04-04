<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ClientCommand;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class StripeController extends Controller
{
    protected $STRIPE_SECRET_KEY = "sk_test_51NVjXNI1z6kkp7Y0vFKo8MMOmdghaVlUtySkUcDfeqOcbrM1fh5S7UQSoK40WUvYF4NS9rxRgG6d6Hrbl2HS5q0u00rOfuwRMF";

    public function initPayment(Request $request)
    {
        \Stripe\Stripe::setApiKey($this->STRIPE_SECRET_KEY);
        try {
            $data = $request->productsData;
            $redirectPage = $request->redirectPage;
            $lineItems = [];
            foreach ($data as $item) {
                $product = Produit::findOrFail($item['id']);
                if (!$product) {
                    throw new \Exception("Product with ID ".$item['id']." not found");
                }
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'mad',
                        'product_data' => [
                            'name' => $product->name,
                            'images' => [$product->image]
                        ],
                        'unit_amount' => $product->finalPrice() * 100,
                    ],
                    'quantity' => $item['qty'],
                ];
            }
            $checkoutSession = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'phone_number_collection' => ['enabled' => true],
                'shipping_address_collection' => [
                    'allowed_countries' => ['MA'],
                ],
                'mode' => 'payment',
                'success_url' => $redirectPage . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $redirectPage,
            ]);
            return response()->json(['status'=>true,'url' => $checkoutSession->url]);
        } catch (\Exception $e) {
            return response()->json(['status'=>false,'error' => $e->getMessage()], 500);
        }
    }
    public function handlePaymentSuccess(Request $request)
    {
        try {
            $operationType = $request->type;
            if (!in_array($operationType, ['pharmacien', 'client'])) {
                return apiResponse(['status' => false, 'message' => 'Invalid operation type'], 400);
            }
            \Stripe\Stripe::setApiKey($this->STRIPE_SECRET_KEY);
            $checkoutSessionId = $request->CHECKOUT_SESSION_ID;
            $session = \Stripe\Checkout\Session::retrieve($checkoutSessionId);
            $productsData = $request->productsData;
            if ($session->status === "complete") {
                $amountTotal = $session->amount_total;
                $customerDetails = $session->customer_details;
                $paymentData = [
                    'total' => $amountTotal,
                    'name' => $customerDetails->name,
                    'email' => $customerDetails->email,
                    'phone' => $customerDetails->phone,
                    'address' => $customerDetails->address->city.", \n".$customerDetails->address->line1.",\n Postal: ".$customerDetails->address->postal_code,
                    'payment_type' => 'online',
                    'stripe_session_id' => $checkoutSessionId,
                    'status' => 'pending',
                    'date_livred_prevenu' => "2028-12-08"
                ];
                if ($operationType === 'client') {
                    $paymentData['client_id'] = auth()->user()->id;
                    if (ClientCommand::where('stripe_session_id',$checkoutSessionId)->first()){
                        return apiResponse(['status'=>false,'message' => 'this session is already saved']);
                    }
                    $order = $this->createPayment('App\Models\ClientCommand', $paymentData);
                } else {
                    $paymentData['pharmacien_id'] = auth()->user()->id;
                    $order = $this->createPayment('App\Models\PharmacienCommand', $paymentData);
                }
                calculTotalCartItems($productsData,$order);
                DB::commit();
                return apiResponse(['status'=>true,'message'=>'Payment & Order is created successfully','order'=>$order]);
            }
            return apiResponse(['status' => false, 'message' => 'Payment not completed']);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }

    private function createPayment($paymentModel, $data)
    {
        return $paymentModel::create($data);
    }
}
