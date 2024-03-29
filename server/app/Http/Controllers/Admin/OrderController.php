<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientCommand;
use App\Models\PharmacienCommand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function updateStatus(string $id, Request $request)
    {
        try {
            if ($request->has('type') && $request->has('status')) {
                switch ($request->type) {
                    case "client":
                        $command = ClientCommand::findOrFail($id);
                        break;
                    case "pharmacien":
                        $command = PharmacienCommand::findOrFail($id);
                        break;
                    default:
                        return apiResponse(['status' => false, 'message' => 'Invalid type command']);
                }
                switch ($request->status) {
                    case "pending":
                    case "delivered":
                    case "in progress":
                        $command->status = $request->status;
                        $command->save();
                        return apiResponse(['status' => true, 'message' => 'Command status updated successfully']);
                    default:
                        return apiResponse(['status' => false, 'message' => 'Invalid command status']);
                }
            } else {
                return apiResponse(['status' => false, 'message' => 'Type and status are required']);
            }
        } catch (\Exception $e) {
            return apiResponse(['status' => false, 'message' => $e->getMessage()]);
        }
    }


    public function updateDate(string $id, Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
               "date_livred" => "nullable",
               "date_livred_prevenu" => "required"
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return apiResponse(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            }
            if ($request->has('type')) {
                switch ($request->type) {
                    case "client":
                        $command = ClientCommand::findOrFail($id);
                        break;
                    case "pharmacien":
                        $command = PharmacienCommand::findOrFail($id);
                        break;
                    default:
                        return apiResponse(['status' => false, 'message' => 'Invalid type command']);
                }
                $command->update([
                    "date_livred" => $request->date_livred,
                    "date_livred_prevenu" => $request->date_livred_prevenu
                ]);
                return apiResponse(['status' => true, 'message' => 'Order updated date Successfully']);
            } else {
                return apiResponse(['status' => false, 'message' => 'Type is required']);
            }

        } catch (\Exception $e) {
            return apiResponse(['status' => false, 'message' => $e->getMessage()]);
        }
    }

}
