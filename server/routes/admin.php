<?php


use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum','auth:admin'])->group(function (){
    Route::get('/admin/users',[UsersController::class,'getUsers']);
    Route::post('/admin/command/{id}/update/status',[OrderController::class,'updateStatus']);
    Route::post('/admin/delete/user/{id}',[UsersController::class,'deleteUser']);
    Route::post('/admin/client/{id}/update',[UsersController::class,'updateClient']);
    Route::post('/admin/update/{id}',[UsersController::class,'updateAdmin']);
    Route::post('/admin/update/pharmacien/{id}',[UsersController::class,'updatePharmacien']);
    Route::post('/admin/update/order/{id}/date',[OrderController::class,'updateDate']);
});
