<?php

use App\Http\Controllers\Payment\StripeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

require_once __DIR__ .'/auth.php';
require_once __DIR__ .'/category.php';
require_once __DIR__ .'/pharmacy.php';
require_once __DIR__ .'/fourniseur.php';
require_once __DIR__ .'/produit.php';
require_once __DIR__ .'/orders.php';
require_once __DIR__ .'/admin.php';
require_once __DIR__ .'/promotion.php';
require_once __DIR__ .'/mobile.php';

Route::middleware('auth:sanctum')->group(function (){
    Route::post("/init/payment",[StripeController::class,"initPayment"]);
    Route::post('/handle/payment/success',[StripeController::class,'handlePaymentSuccess']);
});


