<?php

namespace App\Events;

use App\Models\Device;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeviceStatusUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Device $device;

    public function __construct(Device $device)
    {
        $this->device = $device;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('devices'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'device.status.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'device' => [
                'id' => $this->device->id,
                'nama' => $this->device->nama,
                'lokasi' => $this->device->lokasi,
                'status' => $this->device->status,
                'last_seen' => $this->device->last_seen,
                'content_id' => $this->device->content_id,
            ],
        ];
    }
}