<?php


use App\Http\Controllers\Admin\OrderController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/command/{id}/update/status',[OrderController::class,'updateStatus']);
