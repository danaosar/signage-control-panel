import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create() {

    const [preview, setPreview] = useState<string | null>(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        judul: '',
        tipe: 'image',
        payload: '',
        file: null as File | null,
    });

    useEffect(() => {
        console.log('Errors:', errors);
    }, [errors]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('SUBMIT CLICKED');
        console.log(data);

        post('/contents', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>

            <div className="max-w-2xl mx-auto p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Tambah Content
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    <div>

                        <label>Judul</label>

                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                        {errors.judul && (
                            <div className="text-red-500 text-sm">
                                {errors.judul}
                            </div>
                        )}

                    </div>

                    <div>

                        <label>Tipe</label>

                        <select
                            value={data.tipe}
                            onChange={(e) => {

                                setData('tipe', e.target.value as 'image' | 'video' | 'text');

                                setPreview(null);

                                setData('file', null);

                            }}
                            className="w-full border rounded p-2"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                        </select>

                    </div>

                    {(data.tipe === 'image' || data.tipe === 'video') && (

                        <div>

                            <label>

                                {data.tipe === 'image'
                                    ? 'Upload Image'
                                    : 'Upload Video'}

                            </label>

                            <input
                                type="file"
                                accept={
                                    data.tipe === 'image'
                                        ? 'image/*'
                                        : 'video/*'
                                }
                                onChange={(e) => {

                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    setData('file', file);

                                    setPreview(URL.createObjectURL(file));

                                }}
                                className="w-full border rounded p-2"
                            />

                        </div>

                    )}

                    {preview && data.tipe === 'image' && (

                        <img
                            src={preview}
                            className="rounded border max-h-64"
                        />

                    )}

                    {preview && data.tipe === 'video' && (

                        <video
                            src={preview}
                            controls
                            className="rounded border max-h-64 w-full"
                        />

                    )}

                    <div>

                        <label>Payload</label>

                        <textarea
                            value={data.payload}
                            onChange={(e) => setData('payload', e.target.value)}
                            disabled={data.tipe !== 'text'}
                            className="w-full border rounded p-2"
                            rows={4}
                        />

                        <small className="text-gray-500">

                            {data.tipe === 'text'
                                ? 'Isi text yang akan ditampilkan.'
                                : 'Payload akan diisi otomatis setelah upload.'}

                        </small>

                    </div>

                    <button
                        type="submit"
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