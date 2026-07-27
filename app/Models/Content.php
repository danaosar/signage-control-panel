<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'judul',
        'tipe',
        'payload',
    ];
    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}
