<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    protected $fillable = [
        'playlist_id',
        'content_id',
        'duration',
        'urutan',
    ];

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }

    public function content()
    {
        return $this->belongsTo(Content::class);
    }
}
