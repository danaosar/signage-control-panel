import { Head, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useEffect, useState } from 'react';
import echo from '@/lib/echo';

interface Props {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    totalContents: number;
    imageContents: number;
    videoContents: number;
    textContents: number;
}

export default function Dashboard({
    totalDevices,
    onlineDevices,
    offlineDevices,
    totalContents,
    imageContents,
    videoContents,
    textContents,
}: Props) {

    const [stats, setStats] = useState({
        totalDevices,
        onlineDevices,
        offlineDevices,
        totalContents,
        imageContents,
        videoContents,
        textContents,
    });

    // Sinkronkan state jika props berubah
    useEffect(() => {
        setStats({
            totalDevices,
            onlineDevices,
            offlineDevices,
            totalContents,
            imageContents,
            videoContents,
            textContents,
        });
    }, [
        totalDevices,
        onlineDevices,
        offlineDevices,
        totalContents,
        imageContents,
        videoContents,
        textContents,
    ]);

    useEffect(() => {

        console.log('Dashboard mounted');

        // ==========================
        // Realtime Device
        // ==========================
        echo.channel('devices')
            .listen('.device.status.updated', (event: any) => {

            console.log('Realtime Device:', event.device);

            router.reload({
                only: [
                    'totalDevices',
                    'onlineDevices',
                    'offlineDevices',
                    'totalContents',
                    'imageContents',
                    'videoContents',
                    'textContents',
                ],
                preserveState: true,
                preserveScroll: true,
            });

        });

        // ==========================
        // Realtime Content
        // ==========================
        echo.channel('contents')
            .listen('.content.updated', (event: any) => {

                console.log('Realtime Content:', event);

                router.reload({
                    only: [
                        'totalDevices',
                        'onlineDevices',
                        'offlineDevices',
                        'totalContents',
                        'imageContents',
                        'videoContents',
                        'textContents',
                    ],
                    preserveScroll: true,
                    preserveState: true,
                });

            });

        return () => {
            echo.leave('devices');
            echo.leave('contents');
        };

    }, []);

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <div className="grid gap-4 md:grid-cols-4">

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Total Device
                        </h2>

                        <p className="mt-2 text-4xl font-bold">
                            {stats.totalDevices}
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Device Online
                        </h2>

                        <p className="mt-2 text-4xl font-bold text-green-600">
                            {stats.onlineDevices}
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Device Offline
                        </h2>

                        <p className="mt-2 text-4xl font-bold text-red-600">
                            {stats.offlineDevices}
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Total Content
                        </h2>

                        <p className="mt-2 text-4xl font-bold">
                            {stats.totalContents}
                        </p>
                    </div>

                </div>

                <div className="grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Image Content
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {stats.imageContents}
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Video Content
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {stats.videoContents}
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h2 className="text-gray-500">
                            Text Content
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {stats.textContents}
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};