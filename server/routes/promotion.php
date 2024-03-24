<?php


use App\Http\Controllers\PromotionController;
use Illuminate\Support\Facades\Route;

Route::get('/promotions',[PromotionController::class,'index']);
Route::post('/promotions',[PromotionController::class,'store']);
Route::get('/promotion/{id}',[PromotionController::class,'showPromo']);
Route::post('/promotion/{id}/toggle',[PromotionController::class,'toggleProductsInPromo']);
