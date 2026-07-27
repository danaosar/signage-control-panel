<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Content;
use App\Events\DeviceStatusUpdated;
use App\Http\Requests\StoreDeviceRequest;
use App\Http\Requests\UpdateDeviceRequest;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::latest()->get();

        return Inertia::render('Devices/Index', [
            'devices' => $devices,
        ]);
    }

    public function create()
    {
        return Inertia::render('Devices/Create');
    }

    public function store(StoreDeviceRequest $request)
    {
        Device::create([
            'nama' => $request->nama,
            'lokasi' => $request->lokasi,
            'content_id' => $request->content_id,
            'status' => 'offline',
        ]);

        return redirect()
            ->route('devices.index')
            ->with('success', 'Device berhasil ditambahkan.');
    }

    public function show(Device $device)
    {
        //
    }

    public function edit(Device $device)
    {
        return Inertia::render('Devices/Edit', [
            'device' => $device,
            'contents' => Content::orderBy('judul')->get(),
        ]);
    }

    public function update(UpdateDeviceRequest $request, Device $device)
    {
        $device->update([
            'nama' => $request->nama,
            'lokasi' => $request->lokasi,
            'content_id' => $request->content_id,
        ]);

        event(new DeviceStatusUpdated($device));

        return redirect()
            ->route('devices.index')
            ->with('success', 'Device berhasil diperbarui.');
    }

    public function destroy(Device $device)
    {
        $deletedDevice = clone $device;

        $device->delete();

        event(new DeviceStatusUpdated($deletedDevice));

        return redirect()
            ->route('devices.index')
            ->with('success', 'Device berhasil dihapus.');
    }
}