<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Jobs\VerifyMailJob;
use App\Mail\VerifyEmail;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function __construct()
    {
        Auth::shouldUse('users');
    }

    public function register(RegisterRequest $request)
    {

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $email = $request->email;
            $token = JWTAuth::fromUser($user);

            //verification part start
            $encodedAccessToken = base64_encode(\Str::random(30));
            $url = "access_token=$encodedAccessToken";
            // Mail::to($email)->send(new VerifyEmail($url, $token));
            if (dispatch(new VerifyMailJob($email, $url, $token))) {
                $user->remember_token = $encodedAccessToken;
                $user->save();
            }
            //end

            return response([
                'message' => 'Seccessfully registered, please check your email for verification',
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 401);
        }

        return response([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function emailVerify(Request $request, $token)
    {
        $user = User::where('remember_token', $request->access_token)->first();
        //dd($request->access_token);
        if (!$user) {
            return
                response([
                    'message' => 'Unauthorized token'
                ], 200);
        }
        $user->markVerified();
        return redirect('http://localhost:3000/home');
        return
            response([
                'message' => 'Verified email successful'
            ], 200);
    }

    //login method
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();



                //$token=$user->createToken('app')->accessToken;
                $token = JWTAuth::fromUser($user);
                $test = Auth::check();
                return response([
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => $user,
                    'test' => $test
                ], 200);
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 401);
        }

        return response([
            'message' => 'Invalid email or password'
        ], 401);
    }

    public function logout()
    {
        $test = Auth::check();
        //return $test;
        if (Auth::guard('users')->check()) {
            $token = Auth::guard('users')->getToken();
            JWTAuth::setToken($token);
            JWTAuth::invalidate();
            Auth::logout();
            return  response([
                'message' => 'Logout success'
            ], 200);
        } else {
            return  response([
                'message' => 'Logout error',
                'result' => Auth::guard('users')->check()
            ], 401);
        }
    }
    // public function logout()
    // {
    //     try {
    //         $test = JWTAuth::parseToken()->authenticate();
    //         if ($test) {
    //             JWTAuth::invalidate();
    //         }
    //         return  response([
    //             'message' => 'You have been successfully logged out'

    //         ], 200);
    //     } catch (Exception $e) {
    //         return  response([
    //             'message' => 'token not valid to logout',
    //             'result' => $e->getMessage()
    //         ], 401);
    //     }
    //     // $test = JWTAuth::parseToken()->authenticate();
    //     // if ($test) {
    //     //     return  response([
    //     //         'message' => 'yeeeeeee',
    //     //         'result' => $test
    //     //     ], 200);
    //     // } else {
    //     //     return  response([
    //     //         'message' => 'token not valid to logout',
    //     //         'result' => $e->getMessage()
    //     //     ], 401);
    //     // }
    // }


    public function check()
    {
        // $test = Auth::check();
        try {
            $test = JWTAuth::parseToken()->authenticate();
            JWTAuth::invalidate();
            return  response([
                'message' => 'hello',
                'result' => $test
            ], 401);
        } catch (Exception $e) {
            return  response([
                'message' => 'not done',
                'result' => $e->getMessage()
            ], 401);
        }
    }
}
