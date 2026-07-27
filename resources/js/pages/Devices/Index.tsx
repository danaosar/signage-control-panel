import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import echo from '@/lib/echo';

interface Device {
    id: number;
    nama: string;
    lokasi: string;
    status: 'online' | 'offline';
    last_seen: string | null;
}

interface Props {
    devices: Device[];
}

export default function Index({ devices }: Props) {
    useEffect(() => {

        console.log('Listening devices channel...');

        echo.channel('devices')
            .listen('.device.status.updated', (event: any) => {

                console.log('Device status updated', event);

                router.reload({
                    only: ['devices'],
                    preserveScroll: true,
                    preserveState: true,
                });

            });

        return () => {
            echo.leave('devices');
        };

    }, []);
    return (
        <AppLayout>
            <div className="p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Device Management
                    </h1>

                    <Link
                        href="/devices/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Tambah Device
                    </Link>
                </div>

                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Lokasi</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

                        {devices.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center p-4"
                                >
                                    Belum ada device.
                                </td>
                            </tr>
                        )}

                        {devices.map((device) => (
                            <tr key={device.id}>
                                <td className="border p-2">
                                    {device.nama}
                                </td>

                                <td className="border p-2">
                                    {device.lokasi}
                                </td>

                                <td className="border p-2">
                                    {device.status}
                                </td>

                                <td className="border p-2 space-x-2">

                                    <a
                                        href={`/devices/${device.id}/client`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Lihat
                                    </a>

                                    <Link
                                        href={`/devices/${device.id}/edit`}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm('Yakin ingin menghapus device ini?')) {
                                                router.delete(`/devices/${device.id}`, {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        console.log('Device berhasil dihapus');
                                                    },
                                                });
                                            }
                                        }}
                                        className="text-red-600"
                                    >
                                        Hapus
                                    </button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </AppLayout>
    );
}