import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import echo from '@/lib/echo';

interface Content {
    id: number;
    judul: string;
    tipe: 'image' | 'video' | 'text';
    payload: string;
}

interface Device {
    id: number;
    nama: string;
    lokasi: string;
    status: string;
    content: Content | null;
}

interface Props {
    device: Device;
}

export default function DeviceClient({ device }: Props) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const heartbeat = async () => {
    try {
        await fetch(`/devices/${device.id}/heartbeat`, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': (
                    document.querySelector(
                        'meta[name="csrf-token"]'
                    ) as HTMLMetaElement
                )?.content,
            },
        });
    } catch (e) {
        console.error('Heartbeat gagal', e);
    }
};

    useEffect(() => {

        heartbeat();

        const interval = setInterval(() => {
            heartbeat();
        }, 30000);

        const handleUnload = () => {

            navigator.sendBeacon(
                `/devices/${device.id}/offline`
            );

        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {

            clearInterval(interval);

            window.removeEventListener(
                'beforeunload',
                handleUnload
            );

        };

    }, []);


    if (!device.content) {
        return (
            <>
                <Head title={device.nama} />

                <div className="flex h-screen items-center justify-center bg-black text-white">

                    <div className="text-center">

                        <h1 className="text-5xl font-bold">
                            {device.nama}
                        </h1>

                        <p className="mt-5 text-xl text-gray-400">
                            Belum ada content yang dipilih.
                        </p>

                    </div>

                </div>
            </>
        );
    }


    const content = device.content;
    useEffect(() => {
        setLoading(content.tipe !== 'text');
        setError(false);
    }, [content.id]);


    const mediaUrl =
        content.payload.startsWith('http')
            ? content.payload
            : `${window.location.origin}${content.payload}`;



    return (
        <>
            <Head title={device.nama} />


            <div className="h-screen w-screen overflow-hidden bg-black">


                {/* IMAGE */}
                {content.tipe === 'image' && (

                    <img
                        src={mediaUrl}
                        alt={content.judul}

                        onLoad={() => setLoading(false)}

                        onError={() => {
                            setLoading(false);
                            setError(true);
                        }}

                        className="h-full w-full object-cover"
                    />

                )}



                {/* VIDEO */}
                {content.tipe === 'video' && (

                    <video
                        src={mediaUrl}

                        autoPlay
                        muted
                        loop
                        playsInline

                        onCanPlay={() => {
                            setLoading(false);
                        }}

                        onError={() => {
                            setLoading(false);
                            setError(true);
                        }}

                        className="h-full w-full object-cover"
                    />

                )}



                {/* TEXT */}
                {content.tipe === 'text' && (

                    <div className="flex h-full items-center justify-center">

                        <h1 className="px-10 text-center text-6xl font-bold text-white">

                            {content.payload}

                        </h1>

                    </div>

                )}




                {/* LOADING */}
                {loading && content.tipe !== 'text' && (

                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white">

                        <p className="text-3xl">
                            Loading Content...
                        </p>

                    </div>

                )}




                {/* ERROR */}
                {error && (

                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white">

                        <div className="text-center">

                            <h1 className="text-4xl font-bold">
                                Content Error
                            </h1>

                            <p className="mt-3 text-gray-400">
                                File tidak dapat ditampilkan.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </>
    );
}