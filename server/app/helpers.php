<?php

if (!function_exists('apiResponse')) {
    function apiResponse($data = [], $statusCode = 200, $headers = [])
    {
        return response()->json($data, $statusCode, $headers);
    }
}
