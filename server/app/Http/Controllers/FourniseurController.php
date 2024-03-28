<?php

namespace App\Http\Controllers;

use App\Http\Requests\FourniseurRequest;
use App\Models\Fourniseur;
use Illuminate\Http\Request;

class FourniseurController extends Controller
{
    public function index()
    {
        return apiResponse(['data'=>Fourniseur::orderBy('created_at', 'desc')->get()]);
    }

    public function store(FourniseurRequest $fourniseurRequest)
    {
        try {
            $data = $fourniseurRequest->validated();
            $fourniseur = Fourniseur::create($data);
            return apiResponse(['status'=>true,'message'=>'fourniseur created successfuly']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function show(string $id)
    {
        try {
            $fourn = Fourniseur::findOrFail($id);
            return apiResponse(['status'=>true,'data'=>$fourn]);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function update(FourniseurRequest $fourniseurRequest,string $id)
    {
        try {
            $data = $fourniseurRequest->validated();
            $fourniseur = Fourniseur::findOrFail($id);
            $fourniseur->update($data);
            return apiResponse(['status'=>true,'message'=>'fourniseur updated successfuly']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
    public function destroy(string $id)
    {
        try {
            $fourniseur = Fourniseur::findOrFail($id);
            $fourniseur->delete();
            return apiResponse(['status'=>true,'message'=>'fourniseur deleted successfuly']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message'=>$e->getMessage()],500);
        }
    }
}
