<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Device;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'totalDevices' => Device::count(),
            'onlineDevices' => Device::where('status', 'online')->count(),
            'offlineDevices' => Device::where('status', 'offline')->count(),

            'totalContents' => Content::count(),
            'imageContents' => Content::where('tipe', 'image')->count(),
            'videoContents' => Content::where('tipe', 'video')->count(),
            'textContents' => Content::where('tipe', 'text')->count(),
        ]);
    }
}