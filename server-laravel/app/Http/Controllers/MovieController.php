<?php

namespace App\Http\Controllers;

use App\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::orderBy('id', 'DESC')->get();
        return $movies;
    }

    public function descRating()
    {
        $movies = Movie::orderBy('rating', 'DESC')->take(5)->get();
        return $movies;
    }

    public function ascRating()
    {
        $movies = Movie::orderBy('rating', 'ASC')->take(5)->get();
        return $movies;
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
        //dd($request->all());
        $movie = new Movie();
        $movie->title = $request->title;
        $movie->description = $request->description;

        if ($request->file('image')) {

            $path = Storage::putFile('public', $request->file('image'));
            $url = Storage::url($path);
            $movie->image = $url;
        }


        $movie->save();

        $movie->categories()->sync(explode(",", $request->categories), false);
        // $movie->categories()->sync($request->categories, false);
        return response([
            'message' => 'Seccessfully added',
            'data' => $request->all()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit(Movie $movie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        //
    }

    public function showOne(Request $request)
    {
        $movie = DB::table('movies')->where('id', $request->id)->first();
        return response([
            'message' => 'movie showed',
            'movie' => $movie
        ], 200);
    }
}
