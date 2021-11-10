<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//register
Route::post('/register', 'AuthController@register');
//verify
Route::get('/email/verify/{token}', 'AuthController@emailVerify');
//login
Route::post('/login', 'AuthController@login');
//logout
Route::get('/logout', 'AuthController@logout');
Route::get('/check', 'AuthController@check');

//forgotpass
Route::post('/forgotpassword', 'ForgotController@forgotPassword');


//resetpass
Route::post('/resetpassword', 'ForgotController@resetPassword');

/////for movie adding
//store
Route::post('/movie/store', 'MovieController@store');

//index
Route::get('/movie/index', 'MovieController@index');
Route::get('/movie/desc-rating', 'MovieController@descRating');
Route::get('/movie/asc-rating', 'MovieController@ascRating');

//show one
Route::post('/movie/showOne', 'MovieController@showOne');

/////for movie Rating
Route::post('/movie/rating/store', 'RatingController@store');


/////for movie Comments
Route::post('/movie/comments/store', 'CommentController@store');
Route::get('/movie/comments/show-all', 'CommentController@index');
Route::post('/movie/comments/show-one', 'CommentController@showForOne');


//categories
Route::post('/category/store', 'CategoryController@store');
Route::get('/category/get-all', 'CategoryController@index');
Route::post('/category/movie-for-one', 'CategoryController@getMovieForOne');

//posts
Route::post('/posts/store', 'PostController@store');
Route::get('/posts/all', 'PostController@showAll');
Route::post('/posts/get-one', 'PostController@showOne');
Route::post('/posts/delete-one', 'PostController@deleteOne');
Route::post('/posts/update-one', 'PostController@updateOne');

/////for post Comments
Route::post('/posts/comments/store', 'CommentPostController@store');
Route::post('/posts/comments/show-one', 'CommentPostController@showForOne');
// Route::post('/movie/comments/show-one', 'CommentController@showForOne');
