<?php

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
