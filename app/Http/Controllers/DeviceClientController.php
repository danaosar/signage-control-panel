<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use App\Events\DeviceStatusUpdated;
use Inertia\Inertia;

class DeviceClientController extends Controller
{
    public function show(Device $device)
    {
        $device->load('content');

        return Inertia::render('DeviceClient', [
            'device' => $device,
        ]);
    }

    public function heartbeat(Request $request, Device $device)
    {
        $device->update([
            'status' => 'online',
            'last_seen' => now(),
        ]);

        broadcast(new DeviceStatusUpdated($device));

        return response()->json([
            'success' => true,
        ]);
    }

    public function offline(Request $request, Device $device)
    {
        $device->update([
            'status' => 'offline',
        ]);

        broadcast(new DeviceStatusUpdated($device));

        return response()->json([
            'success' => true,
        ]);
    }
}