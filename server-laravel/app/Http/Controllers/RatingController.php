<?php

namespace App\Http\Controllers;

use App\Movie;
use App\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userID = (int)($request->user_id);
        $movieID = (int)($request->movie_id);
        $post = Rating::where('user_id', '=', $userID)->where('movie_id', '=', $movieID)->first();
        // return response([
        //     'message' => 'Succesfully given Rating',
        //     'data' => $post
        // ], 200);

        if (is_null($post)) {
            $rating = new Rating();
            $rating->movie_id = $request->movie_id;
            $rating->user_id = $request->user_id;
            $rating->rating = $request->rating;

            $rating->save();

            $avgRating = Rating::where('movie_id', '=', $movieID)->avg('rating');
            $movie = Movie::find($movieID);
            $movie->rating = $avgRating;
            $movie->update();

            return response([
                'message' => 'Succesfully given Rating',
                'average' => $avgRating,
                'movie' => $movie

            ], 200);
        } else {
            $post->rating = $request->rating;
            $post->update();
            $avgRating = Rating::where('movie_id', '=', $movieID)->avg('rating');
            $movie = Movie::find($movieID);
            $movie->rating = $avgRating;
            $movie->update();

            return response([
                'message' => 'no',
                'average' => $avgRating,
                'movie' => $movie
            ], 200);
        }

        // $rating = new Rating();
        // $rating->movie_id = $request->movie_id;
        // $rating->user_id = $request->user_id;
        // $rating->rating = $request->rating;

        // $rating->save();
        // return response([
        //     'message' => 'Succesfully given Rating'
        // ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Rating $rating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        //
    }
}
