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

interface Props {
    devices: Device[];
    contents: Content[];
}

export default function Create({ devices, contents }: Props) {

    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        device_id: '',
        content_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/playlists');
    };

    return (
        <AppLayout>

            <div className="max-w-xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Tambah Playlist
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
                                setData('device_id', e.target.value)
                            }
                            className="w-full border rounded p-2"
                        >

                            <option value="">
                                -- Pilih Device --
                            </option>

                            {devices.map((device) => (

                                <option
                                    key={device.id}
                                    value={device.id}
                                >
                                    {device.nama}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label>Content</label>

                        <select
                            value={data.content_id}
                            onChange={(e) =>
                                setData('content_id', e.target.value)
                            }
                            className="w-full border rounded p-2"
                        >

                            <option value="">
                                -- Pilih Content --
                            </option>

                            {contents.map((content) => (

                                <option
                                    key={content.id}
                                    value={content.id}
                                >
                                    {content.judul}
                                </option>

                            ))}

                        </select>

                    </div>

                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>

                </form>

            </div>

        </AppLayout>
    );
}