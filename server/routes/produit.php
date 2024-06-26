<?php

use App\Http\Controllers\ProduitController;
use Illuminate\Support\Facades\Route;


Route::get('/produit/{id}',[ProduitController::class,'show']);
Route::middleware(['auth:sanctum','auth:admin'])->group(function (){
    Route::post('/produit',[ProduitController::class,'store']);
    Route::post('/produit/{id}/update',[ProduitController::class,'update']);
    Route::delete('/produit/{id}',[ProduitController::class,'destroy']);
});



Route::get('/produit',[ProduitController::class,'index']);
