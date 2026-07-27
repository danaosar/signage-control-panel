<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DeviceClientController;
use App\Http\Controllers\PlaylistController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('devices', DeviceController::class);

    Route::resource('contents', ContentController::class);

});

Route::get('/devices/{device}/client', [DeviceClientController::class, 'show'])
    ->name('device.client');

Route::post('/devices/{device}/heartbeat', [DeviceClientController::class, 'heartbeat'])
    ->name('device.heartbeat');

Route::post('/devices/{device}/offline', [DeviceClientController::class, 'offline'])
    ->name('device.offline');

Route::resource('playlists', PlaylistController::class);

Route::post(
    '/playlists/{playlist}/items',
    [PlaylistController::class, 'storeItem']
)->name('playlists.items.store');

Route::put(
    '/playlist-items/{playlistItem}',
    [PlaylistController::class, 'updateItem']
)->name('playlist-items.update');

Route::delete(
    '/playlist-items/{playlistItem}',
    [PlaylistController::class, 'destroyItem']
)->name('playlist-items.destroy');

Route::post(
    '/playlists/{playlist}/push',
    [PlaylistController::class, 'push']
)->name('playlists.push');

require __DIR__.'/settings.php';
