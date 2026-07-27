<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        'nama',
        'lokasi',
        'status',
        'last_seen',
        'content_id',
    ];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }
}
