<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\Pharmacien;
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PharmacienAuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            if($request->newPharmacy === 'true'){
                return $this->registerWithNewPharmacy($request);
            }else {
                return $this->normalRegister($request);
            }
        } catch (\Exception $e) {
            return apiResponse(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }
    protected function registerWithNewPharmacy(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'username' => 'required|max:100|min:8',
                'pharmacy_id' => 'nullable',
                'phone' => 'required|numeric|min:11',
                'CNN' => 'required',
                'email' => 'required|email|unique:pharmaciens,email|max:100',
                'password' => 'required|min:8',
                'name' => 'required',
                'address' => 'required',
                'contact' => 'required',
                // 'percentage' => 'nullable',
                'verified' => 'nullable'
            ]);
            if($validator->fails()){
                return apiResponse([
                    'status'   => false,
                    'message'  => 'Validation errors',
                    'errors'   => $validator->errors()
                ]);
            }
            $newPharmacy = Pharmacy::create($request->all());
            $data = $request->all();
            $data['pharmacy_id'] = $newPharmacy->id;
            $data['password'] = Hash::make($data['password']);
            $newPharmacien = Pharmacien::create($data);
            return apiResponse(['status'=>true,'message'=>'user created successfully','data'=>$newPharmacien]);
        }catch (\Exception $e){
            return apiResponse(['status' => false, 'message' => $e->getMessage(),'type' => 'with new pharmacy'], 500);
        }
    }
    public function normalRegister($request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'username' => 'required|max:100|min:8',
                'pharmacy_id' => 'required',
                'phone' => 'required|numeric|min:11',
                'CNN' => 'required',
                'email' => 'required|email|unique:pharmaciens,email|max:100',
                'password' => 'required|min:8',
            ]);
            if($validator->fails()){
                return apiResponse([
                    'status'   => false,
                    'message'  => 'Validation errors',
                    'errors'   => $validator->errors()
                ]);
            }
            $data = $request->all();
            $data['password'] = Hash::make($data['password']);
            $pharmacien = Pharmacien::create($data);
            return apiResponse(['status'=>true,'message'=>'user created successfully','data'=>$pharmacien]);
        }catch (\Exception $e){
            return apiResponse(['status' => false, 'message' => $e->getMessage(),'type whitout new pharmacy'], 500);
        }
    }

    public function login(LoginRequest $loginRequest)
    {
        $data = $loginRequest->validated();
        try {
            $pharmacien = Pharmacien::where('email', $data['email'])->first();
            if (!$pharmacien || !Hash::check($data['password'],$pharmacien->password )){
                return apiResponse(['success' => false, 'message' => 'validation errors','errors'=>['email'=>['The provided credentials are incorrect']]]);
            }
            if ($pharmacien->verified !== 1){
                return apiResponse(['success' => false, 'message' => 'validation errors','errors'=>['email'=>['This account is not verified']]]);
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
