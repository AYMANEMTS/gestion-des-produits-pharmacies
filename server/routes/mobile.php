<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\mobile\GeustController;

Route::get('/mobile/products', [GeustController::class,'getProducts']);
