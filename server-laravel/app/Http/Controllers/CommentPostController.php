<?php

namespace App\Http\Controllers;

use App\CommentPost;
use Illuminate\Http\Request;

class CommentPostController extends Controller
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
        $comment = new CommentPost();
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->username = $request->username;
        $comment->comment = $request->comment;

        $comment->save();
        return response([
            'message' => 'Seccessfully added comment',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CommentPost  $commentPost
     * @return \Illuminate\Http\Response
     */
    public function show(CommentPost $commentPost)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CommentPost  $commentPost
     * @return \Illuminate\Http\Response
     */
    public function edit(CommentPost $commentPost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CommentPost  $commentPost
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CommentPost $commentPost)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CommentPost  $commentPost
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommentPost $commentPost)
    {
        //
    }

    public function showForOne(Request $request)
    {
        $postID = (int)($request->post_id);
        $comments = CommentPost::where('post_id', '=', $postID)->orderBy('id', 'DESC')->get();
        return response([
            'message' => 'Comments of one post',
            'data' => $comments
        ], 200);
    }
}
