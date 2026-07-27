<?php

namespace App\Events;

use App\Models\Device;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlaylistPushed implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Device $device
    ) {
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('devices'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'playlist.pushed';
    }

    public function broadcastWith(): array
    {
        return [
            'device_id' => $this->device->id,
        ];
    }
}