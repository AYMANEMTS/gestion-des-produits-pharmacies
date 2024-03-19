<?php

namespace App\Http\Controllers;


use App\Http\Requests\PharmacyRequest;
use App\Models\Pharmacy;

class PharmacyController extends Controller
{
    public function store(PharmacyRequest $pharmacyRequest)
    {
        try {
            $data = $pharmacyRequest->validated();
            Pharmacy::create($data);
            return apiResponse(['success'=>'true','message'=>'pharmacy created successfully']);

        }catch (\Exception $e){
            return apiResponse(['success'=>'false','message'=>$e->getMessage()]);
        }
    }
}
