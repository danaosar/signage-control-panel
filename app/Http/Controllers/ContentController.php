<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use App\Models\Content;
use App\Events\ContentUpdated;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index()
    {
        return Inertia::render('Contents/Index', [
            'contents' => Content::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Contents/Create');
    }

    public function store(StoreContentRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('contents', 'public');

            $data['payload'] = '/storage/' . $path;
        }

        $content = Content::create($data);

        event(new ContentUpdated($content));

        return redirect()
            ->route('contents.index')
            ->with('success', 'Content berhasil ditambahkan.');
    }

    public function show(Content $content)
    {
        //
    }

    public function edit(Content $content)
    {
        return Inertia::render('Contents/Edit', [
            'content' => $content,
        ]);
    }

    public function update(UpdateContentRequest $request, Content $content)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {

            $path = $request->file('file')->store('contents', 'public');

            $data['payload'] = '/storage/' . $path;
        }

        $content->update($data);

        logger('CONTENT UPDATED');

        event(new ContentUpdated($content));

        logger('EVENT SENT');

        return redirect()
            ->route('contents.index')
            ->with('success', 'Content berhasil diperbarui.');
    }

    public function destroy(Content $content)
    {
        $deletedContent = clone $content;

        $content->delete();

        event(new ContentUpdated($deletedContent));

        return redirect()
            ->route('contents.index')
            ->with('success', 'Content berhasil dihapus.');
    }
}