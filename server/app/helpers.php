<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('apiResponse')) {
    function apiResponse($data = [], $statusCode = 200, $headers = [])
    {
        return response()->json($data, $statusCode, $headers);
    }
}

if (!function_exists('saveImage')) {
    function saveImage($image)
    {
        $pathName = time() . '_' . $image->getClientOriginalName();
        $image->storeAs('public/products_images', $pathName);
        return $pathName;
    }
}

if (!function_exists('updateImage')) {
    function updateImage($oldImagePath, $newImage)
    {
        if ($newImage !== null) {
            if (Storage::exists('public/products_images/' . $oldImagePath)) {
                Storage::delete('public/products_images/' . $oldImagePath);
            }
            $pathName = time() . '_' . $newImage->getClientOriginalName();
            $newImage->storeAs('public/products_images', $pathName);
            return $pathName;
        }
        return $oldImagePath;
    }
}
