<?php

use App\Http\Controllers\Order\ClientOrderController;
use App\Http\Controllers\Order\PharmacienOrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum','auth:client'])->group(function (){
    Route::get('/client/order/{id}',[ClientOrderController::class,'showOrder']);
    Route::post('/client/order',[ClientOrderController::class,'storeOrder']);
    Route::get('/client/order_user',[ClientOrderController::class,'getClientOrders']);
});

Route::middleware(['auth:sanctum','auth:pharmacien'])->group(function (){
    Route::get('/pharmacien/order',[PharmacienOrderController::class,'showOrders']);
    Route::post('/pharmacien/order',[PharmacienOrderController::class,'storeOrder']);

});
Route::middleware(['auth:sanctum','auth:admin'])->group(function(){
    Route::get('/client/orders',[ClientOrderController::class,'getOrders']);
    Route::get('/pharmacien/orders',[PharmacienOrderController::class,'getOrders']);
});
