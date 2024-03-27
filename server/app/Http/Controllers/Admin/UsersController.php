<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Admin;
use App\Models\Client;
use App\Models\Pharmacien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function getUsers()
    {
        try {
            $user = auth()->guard('admin')->user();
            if ($user){
                $admins = Admin::query()->whereNot('id', $user->id)->orderBy('created_at', 'desc')->get()->map(function ($admin) {
                    $admin['user_type'] = 'admin';
                    return $admin;
                });
                $clients = Client::with(['commands'])->orderBy('created_at', 'desc')->get()->map(function ($client) {
                    $client['user_type'] = 'client';
                    return $client;
                });
                $pharmaciens = Pharmacien::with(['pharmacy', 'commands'])->orderBy('created_at', 'desc')->get()->map(function ($pharmacien) {
                    $pharmacien['user_type'] = 'pharmacien';
                    return $pharmacien;
                });
                return apiResponse([
                    'status' => true,
                    'clients' => $clients,
                    'admins' => $admins,
                    'pharmaciens' => $pharmaciens
                ]);

            }
            return apiResponse(['status'=>false,'message'=>'cannot find user']);
        }catch (\Exception $e){
            return apiResponse(['status'=>false,'message',$e->getMessage()]);
        }
    }
    public function updateClient(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required|max:100|min:8',
                'name' => 'nullable|max:100|min:8',
                'phone' => 'required|numeric|min:11',
                'address' => 'nullable|max:100',
                'CNN' => 'required|max:10',
                'email' => 'required|email|max:100|unique:clients,email,' . $id,
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return apiResponse(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            }
            $client = Client::findOrFail($id);
            $client->update($request->all());
            return apiResponse(['success' => true, 'message' => 'Client updated Successfully']);
        } catch (\Exception $e) {
            return apiResponse(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    public function updateAdmin(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required|max:100|min:8',
                'name' => 'nullable|max:100|min:8',
                'phone' => 'required|numeric|min:11',
                'address' => 'nullable|max:100',
                'email' => 'required|email|max:100|unique:admins,email,' . $id,
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return apiResponse(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            }
            $admin = Admin::findOrFail($id);
            $admin->update($request->all());
            return apiResponse(['success' => true, 'message' => 'Admin updated Successfully']);
        } catch (\Exception $e) {
            return apiResponse(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    public function updatePharmacien(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required|max:100|min:8',
                'name' => 'nullable|max:100|min:8',
                'pharmacy_id' => 'required',
                'phone' => 'required|numeric|min:11',
                'address' => 'nullable|max:100',
                'CNN' => 'required',
                'email' => 'required|email|unique:admins,email|max:100',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return apiResponse(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            }
            $pharmacien = Pharmacien::findOrFail($id);
            $pharmacien->update($request->all());
            return apiResponse(['success' => true, 'message' => 'Pharmacien updated Successfully']);
        } catch (\Exception $e) {
            return apiResponse(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    public function deleteUser(Request $request ,string $id)
    {
        try {
            $type = $request->user_type;
            switch ($type){
                case "admin":
                    $admin = Admin::findOrFail($id);
                    $admin->delete();
                    break;
                case "client":
                    $client = Client::findOrFail($id);
                    $client->delete();
                    break;
                case "pharmacien":
                    $pharmacien = Pharmacien::findOrFail($id);
                    $pharmacien->delete();
                    break;
                default:
                    return apiResponse(['status' => false, 'message' => 'Invalid user type']);
            }
            return apiResponse(['status'=>true,'message'=>"${type} deleted successfully"]);
        }catch (\Exception $e){
            return apiResponse(['status' => false,'message'=>$e->getMessage()],500);
        }
    }
}
