import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

interface Device {
    id: number;
    nama: string;
    lokasi: string;
    content_id: number | null;
}

interface Content {
    id: number;
    judul: string;
}

interface Props {
    device: Device;
    contents: Content[];
}

export default function Edit({ device, contents }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        nama: device.nama,
        lokasi: device.lokasi,
        content_id: device.content_id ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/devices/${device.id}`);
    };

    return (
        <AppLayout>

            <div className="max-w-xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Edit Device
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    <div>

                        <label>Nama</label>

                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                        {errors.nama &&
                            <div className="text-red-500 text-sm">
                                {errors.nama}
                            </div>
                        }

                    </div>

                    <div>

                        <label>Lokasi</label>

                        <input
                            type="text"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                        {errors.lokasi &&
                            <div className="text-red-500 text-sm">
                                {errors.lokasi}
                            </div>
                        }

                    </div>

                    <div>

                        <label>Content</label>

                        <select
                            value={data.content_id}
                            onChange={(e) =>
                                setData(
                                    'content_id',
                                    e.target.value === ''
                                        ? ''
                                        : Number(e.target.value)
                                )
                            }
                            className="w-full border rounded p-2"
                        >

                            <option value="">
                                -- Tidak ada Content --
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

                        {errors.content_id &&
                            <div className="text-red-500 text-sm">
                                {errors.content_id}
                            </div>
                        }

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