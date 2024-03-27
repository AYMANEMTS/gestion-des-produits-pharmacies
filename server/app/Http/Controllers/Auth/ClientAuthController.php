<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\ClientRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    public function register(ClientRequest $clientRequest)
    {
        $data = $clientRequest->validated();
        try {
            $data['password'] = Hash::make($data['password']);
            $client = Client::create($data);
            return apiResponse(['success'=>true,'message' => 'Registration successful! Please log in to your account.']);
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);

        }
    }
    public function login(LoginRequest $loginRequest)
    {
        $data = $loginRequest->validated();
        try {
            $client = Client::where('email', $data['email'])->first();
            if (!$client || !Hash::check($data['password'],$client->password)){
                return apiResponse(['success' => false, 'message' => 'validation errors','errors'=>['email'=>['The provided credentials are incorrect']]]);
            }
            return apiResponse([
                'status' => true,
                'token' => $client->createToken('client',['user:client'])->plainTextToken,
                'clientData' => $client
            ]);
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
