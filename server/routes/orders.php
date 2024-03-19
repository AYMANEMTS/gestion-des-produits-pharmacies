<?php

use App\Http\Controllers\Order\ClientOrderController;
use App\Http\Controllers\Order\PharmacienOrderController;
use Illuminate\Support\Facades\Route;

Route::get('/client/order',[ClientOrderController::class,'showOrders']);
Route::post('/client/order',[ClientOrderController::class,'storeOrder']);

Route::get('/pharmacien/order',[PharmacienOrderController::class,'showOrders']);
Route::post('/pharmacien/order',[PharmacienOrderController::class,'storeOrder']);
