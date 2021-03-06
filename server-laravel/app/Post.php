<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentPosts()
    {
        return $this->hasMany(CommentPost::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
