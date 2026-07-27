import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';

interface Playlist {
    id: number;
    nama: string;

    device: {
        id: number;
        nama: string;
    };

    content: {
        id: number;
        judul: string;
    };
}

interface Props {
    playlists: Playlist[];
}

export default function Index({ playlists }: Props) {

    return (
        <AppLayout>

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        Playlist Management
                    </h1>

                    <Link
                        href="/playlists/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Tambah Playlist
                    </Link>

                </div>

                <table className="w-full border border-gray-300">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="border p-2">
                                Nama Playlist
                            </th>

                            <th className="border p-2">
                                Device
                            </th>

                            <th className="border p-2">
                                Content
                            </th>

                            <th className="border p-2">
                                Aksi
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {playlists.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="text-center p-4"
                                >
                                    Belum ada playlist.
                                </td>

                            </tr>

                        )}

                        {playlists.map((playlist) => (

                            <tr key={playlist.id}>

                                <td className="border p-2">
                                    {playlist.nama}
                                </td>

                                <td className="border p-2">
                                    {playlist.device.nama}
                                </td>

                                <td className="border p-2">
                                    {playlist.content.judul}
                                </td>

                                <td className="border p-2 space-x-2">

                                    <Link
                                        href={`/playlists/${playlist.id}/edit`}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="text-red-600"
                                        onClick={() => {

                                            if (confirm('Yakin ingin menghapus playlist ini?')) {

                                                router.delete(
                                                    `/playlists/${playlist.id}`
                                                );

                                            }

                                        }}
                                    >
                                        Hapus
                                    </button>

                                    <button
                                        onClick={() => {

                                            if (!confirm('Push playlist ke device?'))
                                                return;

                                            router.post(`/playlists/${playlist.id}/push`);

                                        }}
                                        className="text-green-600"
                                    >
                                        Push
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