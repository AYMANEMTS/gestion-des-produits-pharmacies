<?php

use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\ClientAuthController;
use App\Http\Controllers\Auth\PharmacienAuthController;
use Illuminate\Support\Facades\Route;

/* Auth */
Route::post('/admin/create', [AdminAuthController::class,'register']);
Route::post('/admin/login', [AdminAuthController::class,'login']);

Route::post('/client/create', [ClientAuthController::class,'register']);
Route::post('/client/login', [ClientAuthController::class,'login']);

Route::post('/pharmacien/create', [PharmacienAuthController::class,'register']);
Route::post('/pharmacien/login', [PharmacienAuthController::class,'login']);
/* End Auth */


