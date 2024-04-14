<?php

namespace App\Http\Controllers;

use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }

    // Register methods 

    public function createRegister()
    {
        return view('auth.register');
    }
    public function storeRegister(Request $request)
    {
        /* 
        Validation
        */
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ]);

        /*
        Database Insert
        */
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])
            // ->assignRole('user')
            ;

        Auth::login($user);

        return redirect()->to('/');
    }

    // Login methods 


    public function createLogin()
    {
        return view('auth.login');
    }

    public function storeLogin(Request $request)
    {
        $formFields = $request->validate([
            "email" => ['required', 'email'],
            "password" => 'required'
        ]);
    
        $remember = $request->filled('remember');
    
        if (Auth::attempt($formFields, $remember)) {
            $request->session()->regenerate();
            return response()->json(['success' => 'Login successful']);
        }  
        return response()->json(['error' => 'Invalid credentials'], 422);
    }
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
    public function showLinkRequestForm()
    {
        return view('auth.ForgotPassword.email');
    }
    public function sendResetLinkEmail(Request $request)
    {
        $email = $request->email;
        request()->validate([
            'email' => 'required|email|exists:users'
        ]);


        $token = Str::random(64);
        $test = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->count();
        if (!$test) {
            DB::table('password_reset_tokens')->insert([
                'email' => request()->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
        }

        Mail::send('auth.ForgotPassword.forget-password', compact('token'), function ($message) {
            $message->to(request()->email);
            $message->subject('Reset Password');
        });
        return redirect()->route('password.request')->with('success', 'we send an email');
    }
    public function showResetForm($token) {
        return view('auth.ForgotPassword.new-password', compact('token'));
    }
    public function reset(request $request){
        request()->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|confirmed'
        ]);

        $updatePassword = DB::table('password_reset_tokens')->where([
            'email' => request()->email,
            'token' => request()->token
        ])->first();

        if(!$updatePassword) {
            return redirect()->route('password.reset',request()->token)->with('error', 'invalid');
        }

        User::where('email', request()->email)->update([
            'password' => Hash::make(request()->password)
        ]);

        DB::table('password_reset_tokens')->where(['email' => request()->email])->delete();

        return redirect()->route('login');
    }
}
