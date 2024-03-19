<?php

use App\Http\Controllers\FourniseurController;
use Illuminate\Support\Facades\Route;

Route::get('/fourniseur',[FourniseurController::class,'index']);
Route::get('/fourniseur/{id}',[FourniseurController::class,'show']);
Route::post('/fourniseur',[FourniseurController::class,'store']);
Route::post('/fourniseur/{id}/update',[FourniseurController::class,'update']);
Route::delete('/fourniseur/{id}',[FourniseurController::class,'destroy']);
