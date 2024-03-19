<?php

use App\Http\Controllers\ProduitController;
use Illuminate\Support\Facades\Route;

Route::get('/produit',[ProduitController::class,'index']);
Route::get('/produit/{id}',[ProduitController::class,'show']);
Route::post('/produit',[ProduitController::class,'store']);
Route::post('/produit/{id}/update',[ProduitController::class,'update']);
Route::delete('/produit/{id}',[ProduitController::class,'destroy']);
