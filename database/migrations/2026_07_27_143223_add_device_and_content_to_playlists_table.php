<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('playlists', function (Blueprint $table) {

            $table->foreignId('device_id')
                ->after('nama')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('content_id')
                ->after('device_id')
                ->constrained()
                ->cascadeOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('playlists', function (Blueprint $table) {

            $table->dropForeign(['device_id']);
            $table->dropForeign(['content_id']);

            $table->dropColumn([
                'device_id',
                'content_id',
            ]);

        });
    }
};