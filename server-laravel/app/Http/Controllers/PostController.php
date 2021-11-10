<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
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
        $post = new Post();
        $post->user_id = $request->user_id;
        $post->title = $request->title;
        $post->description = $request->description;

        if ($request->file('image')) {

            $path = Storage::putFile('public', $request->file('image'));
            $url = Storage::url($path);
            $post->image = $url;
        }


        $post->save();

        return response([
            'message' => 'Seccessfully added'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }

    public function showAll(Post $post)
    {
        $posts = Post::orderBy('id', 'DESC')->get();
        // $posts = DB::table('posts')->orderBy('posts.id', 'DESC')->join('users', 'users.id', '=', 'posts.user_id')->get();

        return $posts;
    }

    public function showOne(Request $request)
    {
        // $post = DB::table('posts')->where('id', $request->id)->first();
        $post = DB::table('posts')->where('posts.id', $request->id)->join('users', 'users.id', '=', 'posts.user_id')->first();
        return response([
            'message' => 'post showed',
            'post' => $post
        ], 200);
    }

    public function deleteOne(Request $request)
    {
        $post = DB::table('posts')->where('id', $request->id)->first();
        if ($post->user_id != $request->user_id) {
            return response([
                'message' => 'User dont have access',
                'post' => $post
            ], 200);
        }
        $res = Post::where('id', $request->id)->delete();
        return response([
            'message' => 'post deleted',
            'post' => $res
        ], 200);
    }

    public function updateOne(Request $request)
    {
        $post = Post::find($request->id);
        $post->user_id = $request->user_id;
        $post->title = $request->title;
        $post->description = $request->description;

        if ($request->file('image')) {

            $path = Storage::putFile('public', $request->file('image'));
            $url = Storage::url($path);
            $post->image = $url;
        }


        $post->update();

        return response([
            'message' => 'Seccessfully updated'
        ], 200);
    }
}
