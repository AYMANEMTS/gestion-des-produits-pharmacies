<?php


use App\Http\Controllers\PharmacyController;
use Illuminate\Support\Facades\Route;





Route::middleware(['auth:sanctum','auth:admin'])->group(function (){
    Route::get('/pharmacy',[PharmacyController::class,'index']);
    Route::post('/pharmacy/store',[PharmacyController::class,'store']);
    Route::get('/pharmacy/{id}',[PharmacyController::class,'show']);
    Route::post('/pharmacy/{id}/update',[PharmacyController::class,'update']);
    Route::delete('/pharmacy/{id}',[PharmacyController::class,'destroy']);
});


Route::get('/pharmacy',[PharmacyController::class,'index']);
