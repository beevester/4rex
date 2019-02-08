<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getRestPasswordRow($request)->get();

    }

    public function getRestPasswordRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->restToken]);
    }
}
