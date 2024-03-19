<?php

namespace App\Http\Controllers;


use App\Http\Requests\PharmacyRequest;
use App\Models\Pharmacy;

class PharmacyController extends Controller
{
    public function index()
    {
        return apiResponse(['data'=>Pharmacy::all()]);
    }

    public function store(PharmacyRequest $pharmacyRequest)
    {
        try {
            $data = $pharmacyRequest->validated();
            Pharmacy::create($data);
            return apiResponse(['success'=>'true','message'=>'pharmacy created successfully']);

        }catch (\Exception $e){
            return apiResponse(['success'=>'false','message'=>$e->getMessage()],500);
        }
    }

    public function show(string $id)
    {
        try {
            $pharmacy = Pharmacy::findOrFail($id);
            return apiResponse(['status'=>true,'data'=>$pharmacy]);
        }catch (\Exception $e) {
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }

    public function update(string $id,PharmacyRequest $pharmacyRequest)
    {
        try {
            $data = $pharmacyRequest->validated();
            $pharmacy = Pharmacy::findOrFail($id);
            $pharmacy->update($data);
            return apiResponse(['success'=>'true','message'=>'pharmacy updated successfully']);

        }catch (\Exception $e){
            return apiResponse(['success'=>'false','message'=>$e->getMessage()],500);
        }
    }
    public function destroy(string $id)
    {
        try {
            $pharmacy = Pharmacy::findOrFail($id);
            $pharmacy->delete();
            return apiResponse(['status'=>true,'message'=>'pharmacy deleted successfully']);
        }catch (\Exception $e) {
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
}
