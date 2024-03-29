<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{

    public function category() {
        return $this->belongsTo('App\Models\Category');
    }
}
