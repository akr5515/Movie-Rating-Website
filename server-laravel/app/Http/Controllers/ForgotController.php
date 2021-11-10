<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;
use DB;
use Mail;
use App\Mail\ForgotMail;
use App\User;
use Illuminate\Support\Facades\Hash;

use App\Jobs\ForgetPasswordMailJob;

class ForgotController extends Controller
{
    public function forgotPassword(ForgotRequest $request)
    {
        $email = $request->email;
        if (User::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'Email invalid',

            ], 404);
        }
        if (!DB::table('password_resets')->where('email', $email)->doesntExist()) {
            return response([
                'message' => 'Mail already sent',

            ], 200);
        }

        $token = rand(1000, 100000);

        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            dispatch(new ForgetPasswordMailJob($email, $token));

            //Mail::to($email)->send(new ForgotMail($token));
            return response([
                'message' => 'Email and password have been sent to your email',

            ], 200);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 401);
        }
    }

    public function resetPassword(ResetRequest $request)
    {
        $email = $request->email;
        $token = $request->token;
        $password = Hash::make($request->password);

        $emailcheck = DB::table('password_resets')->where('email', $email)->first();
        $pincheck = DB::table('password_resets')->where('token', $token)->first();

        if (!$emailcheck) {
            return response([
                'message' => 'Email not found'
            ], 401);
        }
        if (!$pincheck) {
            return response([
                'message' => 'Pincode Invalid'
            ], 401);
        }

        DB::table('users')->where('email', $email)->update(['password' => $password]);
        DB::table('password_resets')->where('email', $email)->delete();

        return response([
            'message' => 'Password Change Successfully'
        ], 200);
    }
}
