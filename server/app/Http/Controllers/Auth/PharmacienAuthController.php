<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PharmacienRequest;
use App\Models\Client;
use App\Models\Pharmacien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PharmacienAuthController extends Controller
{
    public function register(PharmacienRequest $pharmacienRequest)
    {
        $data = $pharmacienRequest->validated();
        try {
            $data['password'] = Hash::make($data['password']);
            $pharmacien = Pharmacien::create($data);
            return apiResponse(['success'=>'true','data'=>$pharmacien]);
        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);

        }
    }
    public function login(LoginRequest $loginRequest)
    {
        $data = $loginRequest->validated();
        try {
            $pharmacien = Pharmacien::where('email', $data['email'])->first();
            if (!$pharmacien || !Hash::check($data['password'],$pharmacien->password)){
                return apiResponse('The provided credentials are incorrect.',401);
            }
            return apiResponse([
                'status' => true,
                'token' => $pharmacien->createToken('pharmacien',['user:pharmacien'])->plainTextToken,
                'pharmacienData' => $pharmacien
            ]);

        }catch (\Exception $e){
            return apiResponse(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
