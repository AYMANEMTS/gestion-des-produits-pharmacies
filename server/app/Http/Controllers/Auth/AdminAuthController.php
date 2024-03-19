<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function register(AdminRequest $adminRequest)
    {
        $data = $adminRequest->validated();
        try {
            $data['password'] = Hash::make($data['password']);
            $admin = Admin::create($data);
            return apiResponse(['success'=>'true','data'=>$admin]);
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);

        }

    }
    public function login(LoginRequest $loginRequest)
    {
        $data = $loginRequest->validated();
        try {
            if (auth()->guard('admin')->attempt($data)){
                dd('login success');
            }else{
                return apiResponse(['success' => false, 'message' => 'validation errors','errors'=>['email'=>['invalid credential']]], 500);
            }
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
