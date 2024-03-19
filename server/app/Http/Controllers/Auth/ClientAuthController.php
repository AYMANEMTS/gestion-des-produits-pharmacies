<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\ClientRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    public function register(ClientRequest $clientRequest)
    {
        $data = $clientRequest->validated();
        try {
            $data['password'] = Hash::make($data['password']);
            $client = Client::create($data);
            return apiResponse(['success'=>'true','data'=>$client]);
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);

        }
    }
    public function login(LoginRequest $loginRequest)
    {
        $data = $loginRequest->validated();
        try {
            if (auth()->guard('client')->attempt($data)){
                dd('login success');
            }else{
                return apiResponse(['success' => false, 'message' => 'validation errors','errors'=>['email'=>['invalid credential']]], 500);
            }
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
