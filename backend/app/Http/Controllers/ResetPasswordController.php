<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if (!$this->validateEmail($request->email))
        {
            return $this->failedResponse();
        }

        $this->send($request->email);
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function createToken($email)
    {
//        $preToken = DB::table('password_resets')->where('email', $email)->first();
//        if($preToken) {
//            return $preToken;
//        }
        $token = str_random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset password was sent to your email'
        ], Response::HTTP_OK);
    }
    public function failedResponse()
    {
        return response()->json([
            'error' => 'Email is not found in our records'
        ], Response::HTTP_NOT_FOUND);
    }
}
