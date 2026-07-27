<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('devices', function () {
    return true;
});