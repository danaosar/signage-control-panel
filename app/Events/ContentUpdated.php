<?php

namespace App\Events;

use App\Models\Content;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class ContentUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(Content $content)
    {
        $this->content = $content;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('contents'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'content.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->content->id,
            'judul' => $this->content->judul,
            'tipe' => $this->content->tipe,
            'payload' => $this->content->payload,
        ];
    }
}