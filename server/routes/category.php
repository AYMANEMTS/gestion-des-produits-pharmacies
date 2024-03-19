<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('/category',[CategoryController::class,'index']);
Route::get('/category/{id}',[CategoryController::class,'show']);
Route::post('/category',[CategoryController::class,'store']);
Route::delete('/category/{id}',[CategoryController::class,'destroy']);
Route::post('/category/{id}/update',[CategoryController::class,'destroy']);
