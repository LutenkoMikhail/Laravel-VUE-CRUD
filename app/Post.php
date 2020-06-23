<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'id',
    ];
    public $rules = [
        'title' => 'required|max:255',
        'description' => 'required|max:255'
    ];
    public $attributes=[
        'title' => 'Title',
        'description' => 'Description'
    ];

    public function validate(Request $request)
    {
        return $request->validate($this->rules,[],$this->attributes);
    }
}
