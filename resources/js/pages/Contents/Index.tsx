import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';

interface Content {
    id: number;
    judul: string;
    tipe: string;
    payload: 'online' | 'offline';
    last_seen: string | null;
}

interface Props {
    contents: Content[];
}

export default function Index({ contents }: Props) {
    return (
        <AppLayout>
            <div className="p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Device Management
                    </h1>

                    <Link
                        href="/contents/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Tambah Content
                    </Link>
                </div>

                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Judul</th>
                            <th className="border p-2">Tipe</th>
                            <th className="border p-2">Payload</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

                        {contents.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center p-4"
                                >
                                    Belum ada content.
                                </td>
                            </tr>
                        )}

                        {contents.map((content) => (
                            <tr key={content.id}>
                                <td className="border p-2">
                                    {content.judul}
                                </td>

                                <td className="border p-2">
                                    {content.tipe}
                                </td>

                                <td className="border p-2">
                                    {content.payload}
                                </td>

                                <td className="border p-2 space-x-2">

                                    <Link
                                        href={`/contents/${content.id}/edit`}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm('Yakin ingin menghapus content ini?')) {
                                                router.delete(`/contents/${content.id}`, {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        console.log('Content berhasil dihapus');
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