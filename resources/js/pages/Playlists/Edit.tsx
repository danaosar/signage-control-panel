import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

interface Device {
    id: number;
    nama: string;
}

interface Content {
    id: number;
    judul: string;
}

interface Playlist {
    id: number;
    nama: string;
    device_id: number;
    content_id: number;
}

interface Props {
    playlist: Playlist;
    devices: Device[];
    contents: Content[];
}

export default function Edit({
    playlist,
    devices,
    contents,
}: Props) {

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        nama: playlist.nama,
        device_id: playlist.device_id,
        content_id: playlist.content_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/playlists/${playlist.id}`);
    };

    return (
        <AppLayout>

            <div className="max-w-xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Edit Playlist
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    <div>

                        <label>Nama Playlist</label>

                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) =>
                                setData('nama', e.target.value)
                            }
                            className="w-full border rounded p-2"
                        />

                        {errors.nama && (
                            <div className="text-red-500 text-sm">
                                {errors.nama}
                            </div>
                        )}

                    </div>

                    <div>

                        <label>Device</label>

                        <select
                            value={data.device_id}
                            onChange={(e) =>
                                setData('device_id', Number(e.target.value))
                            }
                            className="w-full border rounded p-2"
                        >

                            {devices.map((device) => (

                                <option
                                    key={device.id}
                                    value={device.id}
                                >
                                    {device.nama}
                                </option>

                            ))}

                        </select>

                        {errors.device_id && (
                            <div className="text-red-500 text-sm">
                                {errors.device_id}
                            </div>
                        )}

                    </div>

                    <div>

                        <label>Content</label>

                        <select
                            value={data.content_id}
                            onChange={(e) =>
                                setData('content_id', Number(e.target.value))
                            }
                            className="w-full border rounded p-2"
                        >

                            {contents.map((content) => (

                                <option
                                    key={content.id}
                                    value={content.id}
                                >
                                    {content.judul}
                                </option>

                            ))}

                        </select>

                        {errors.content_id && (
                            <div className="text-red-500 text-sm">
                                {errors.content_id}
                            </div>
                        )}

                    </div>

                    <button
                        disabled={processing}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>

                </form>

            </div>

        </AppLayout>
    );
}