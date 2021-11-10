<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    public function movies()
    {
        return $this->belongsTo(Movie::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
