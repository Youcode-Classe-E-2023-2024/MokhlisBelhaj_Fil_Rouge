<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
     /**
 * @OA\Post(
 *     path="/api/register",
 *     summary="Register a new user",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name","email","password"},
 *             @OA\Property(property="name", type="string", example="John Doe"),
 *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="password"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="password")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="User registered successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="User is created successfully."),
 *             @OA\Property(property="data", type="object",
 *                 @OA\Property(property="user", type="object",
 *                     @OA\Property(property="name", type="string"),
 *                     @OA\Property(property="email", type="string", format="email")
 *                 ),
 *                 @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOi...")                 
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Validation Error",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="failed"),
 *             @OA\Property(property="message", type="string", example="Validation Error!"),
 *             @OA\Property(property="data", type="object",
 *                 @OA\Property(property="name", type="array",
 *                     @OA\Items(type="string", example="The name field is required.")
 *                 ),
 *                 @OA\Property(property="email", type="array",
 *                     @OA\Items(type="string", example="The email field is required.")
 *                 ),
 *                 @OA\Property(property="password", type="array",
 *                     @OA\Items(type="string", example="The password field is required.")
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function register(Request $request)
    {
        
       
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'email' => 'required|string|max:250|unique:users,email',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|same:password',
            'imageUrl'=>'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'imageUrl'=>$request->imageUrl
        ])->giveRolesTo('user');

        // $data['token'] = $user->createToken($request->email)->accessToken;
        // $data['user'] = $user;

        $response = [
            'status' => 'success',
            'message' => 'User is created successfully.',
            // 'data' => $data,
        ];

        return response()->json($response, 201);
    }

    /**
 * Authenticate a user.
 *
 * @OA\Post(
 *     path="/api/login",
 *     summary="Authenticate a user",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         description="User credentials",
 *         @OA\JsonContent(
 *             required={"email","password"},
 *             @OA\Property(property="email", type="string", format="email"),
 *             @OA\Property(property="password", type="string", format="password"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User logged in successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="User is logged in successfully."),
 *             @OA\Property(property="data", type="object",
 *                 @OA\Property(property="user", type="object",
 *                     @OA\Property(property="id", type="integer", example="1"),
 *                     @OA\Property(property="name", type="string", example="John Doe"),
 *                     @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *                 ),
 *                 @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkODRlNjU4ZDk4NDc2M2I1MTUzNzkwN2Q5ZjE5ZjgzM2I3MDY1N2M4OTkzNGU3YjQxYzUwNzA5MzY0NjE5MTY5MjU0NGI2NjYzNDQ3ZGRiIn0.eyJhdWQiOiIxIiwianRpIjoiNmQ4NGU2NThkOTg0NzYzYjUxNTM3OTA3ZDlmMTlmODMzYjcwNjU3Yzg5OTM0ZTdiNDFjNTA3MDkzNjQ2MTkxNjkyNTQ0YjY2NjM0NDdkZGIiLCJpYXQiOjE2MTk2NTM4NTcsIm5iZiI6MTYxOTY1Mzg1NywiZXhwIjoxNjE5NjU3NDU3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.T5TOOzViMQ69klYkfG1bFbml8xFsV8NlZ71vXV5UElzGmJMOxYyoFGcQYOcCzTGWbYbQsQ62Qd6b9Dv8ROa6yQ"),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Invalid credentials",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="failed"),
 *             @OA\Property(property="message", type="string", example="Invalid credentials"),
 *         )
 *     )
 * )
 */
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        // Check email exist
        $user = User::where('email', $request->email)->first();

        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $data['token'] = $user->createToken($request->email)->accessToken;
        $data['user'] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'imageUrl'=>$user->imageUrl,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'role' => $user->roles->pluck('name')->implode(', ')
        ];


        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }
 /**
 * @OA\Post(
 *     path="/api/logout",
 *     summary="Log out the user from the application",
 *     tags={"Authentication"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="User logged out successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="User is logged out successfully")
 *         )
 *     )
 * )
 */
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'User is logged out successfully'
        ], 200);
    }
   /**
 * @OA\Post(
 *     path="/api/forgotPassword",
 *     summary="Generate and send a password reset link to the user",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email"},
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Password reset link sent successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="Password reset link sent to your email")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="failed"),
 *             @OA\Property(property="message", type="string", example="User not found")
 *         )
 *     )
 * )
 */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['status' => 'failed', 'message' => 'User not found'], 404);
        }

        $token = Str::random(60);
        $user = DB::table('password_reset_tokens')->where('email', $user->email)->first();

        if ($user) {
            DB::table('password_reset_tokens')->where('email', $user->email)->delete();
        }
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
        ]);





        Mail::send('auth.passwords.forget-password', compact('token'), function ($message) {
            $message->to(request()->email);
            $message->subject('Reset Password');
        });


        // Send email with reset link containing $token

        return response()->json(['status' => 'success', 'message' => 'Password reset link sent to your email']);
    }

    
/**
 * @OA\Post(
 *     path="/api//mot-de-passe/reset/",
 *     summary="Reset the user's password with the specified reset token",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email", "password", "password_confirmation", "token"},
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="newpassword"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="newpassword"),
 *             @OA\Property(property="token", type="string", example="reset_token_value")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Password reset successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Password reset successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid token",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="invalid_token")
 *         )
 *     )
 * )
 */
    public function reset(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed'
        ]);


        // Check if a valid token exists for the email
        $updatePassword = DB::table('password_reset_tokens')
            ->where([
                'email' => $validatedData['email'],
                'token' => $request->token
            ])->first();
        // If no valid token found, return error response
        if (!$updatePassword) {
            return response()->json(['error' => 'invalid_token'], 400);
        }

        // Update the user's password
        User::where('email', $validatedData['email'])
            ->update(['password' => Hash::make($validatedData['password'])]);

        // Delete the password reset token entry
        DB::table('password_reset_tokens')->where('email', $validatedData['email'])->delete();

        // Return a success response
        return response()->json(['message' => 'Password reset successfully'], 200);
    }
    public function refreshUser(Request $request)
    {
        $user = auth()->user();
        $data['user'] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'imageUrl'=> $user->imageUrl,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'role' => $user->roles->pluck('name')->implode(', ')
        ];
        // $token = $request->bearerToken();
        // $user = null;
        // if (!!$token) {
        //     $user = User::where([
        //         'remember_token' => $token
        //     ])->first();
        // }  
        return response()->json( $data, 200);
    }
}
