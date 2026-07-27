import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        lokasi: '',
        content_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/devices');
    };

    return (
        <AppLayout>
            <div className="max-w-xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Tambah Device
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label>Nama</label>

                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                        {errors.nama && (
                            <div className="text-red-500 text-sm">
                                {errors.nama}
                            </div>
                        )}
                    </div>

                    <div>
                        <label>Lokasi</label>

                        <input
                            type="text"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                        {errors.lokasi && (
                            <div className="text-red-500 text-sm">
                                {errors.lokasi}
                            </div>
                        )}
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