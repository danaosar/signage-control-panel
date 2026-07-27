<?php

namespace App\Http\Controllers;

use App\Events\PlaylistPushed;
use App\Models\Playlist;
use App\Models\Device;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    public function index()
    {
        return Inertia::render('Playlists/Index', [
            'playlists' => Playlist::with([
                'device',
                'content',
            ])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Playlists/Create', [
            'devices' => Device::orderBy('nama')->get(),
            'contents' => Content::orderBy('judul')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|max:255',
            'device_id' => 'required|exists:devices,id',
            'content_id' => 'required|exists:contents,id',
        ]);

        Playlist::create($validated);

        return redirect()->route('playlists.index');
    }

    public function edit(Playlist $playlist)
    {
        return Inertia::render('Playlists/Edit', [
            'playlist' => $playlist,
            'devices' => Device::orderBy('nama')->get(),
            'contents' => Content::orderBy('judul')->get(),
        ]);
    }

    public function update(Request $request, Playlist $playlist)
    {
        $validated = $request->validate([
            'nama' => 'required|max:255',
            'device_id' => 'required|exists:devices,id',
            'content_id' => 'required|exists:contents,id',
        ]);

        $playlist->update($validated);

        return redirect()->route('playlists.index');
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete();

        return redirect()->back();
    }

    public function push(Playlist $playlist)
    {
        $device = Device::findOrFail($playlist->device_id);

        $device->update([
            'content_id' => $playlist->content_id,
        ]);

        event(new PlaylistPushed($device));

        return back()->with(
            'success',
            'Playlist berhasil dikirim.'
        );
    }
}