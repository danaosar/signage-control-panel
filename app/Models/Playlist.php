<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $fillable = [
        'nama',
        'device_id',
        'content_id',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function content()
    {
        return $this->belongsTo(Content::class);
    }
}