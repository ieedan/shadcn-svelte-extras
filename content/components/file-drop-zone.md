---
title: 'File Drop Zone'
description: 'A file drop zone component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import schemaRaw from '$lib/docs/file-drop-zone-schema.ts?raw';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="file-drop-zone" />

## Installation

<Add item="file-drop-zone" />

## Usage

```svelte
<script lang="ts">
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
</script>

<FileDropZone.Root>
	<FileDropZone.Trigger />
	<FileDropZone.Textarea />
	<FileDropZone.DragOverlay />
</FileDropZone.Root>
```

## Composition

Use the following composition to build a `FileDropZone`:

```text
FileDropZone.Root
├── FileDropZone.Trigger
├── FileDropZone.Textarea
└── FileDropZone.DragOverlay
```

Custom placeholder:

```svelte
<script lang="ts">
	import { FileDropZone } from '$lib/components/ui/file-drop-zone';
</script>

<FileDropZone.Root>
	<FileDropZone.Trigger>Upload files</FileDropZone.Trigger>
</FileDropZone.Root>
```

## Text Area

You can use the Textarea component to allow users to paste or drag and drop files into a textarea.

<Demo demo="file-drop-zone-text-area" />

## Paste Capture

Add `capturePaste` to upload files whenever the user pastes anywhere on the page. Only files are uploaded, pasted text is ignored.

<Demo demo="file-drop-zone-paste-capture" />

```svelte
<script lang="ts">
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
</script>

<FileDropZone.Root {onUpload} capturePaste>
	<FileDropZone.Trigger />
</FileDropZone.Root>
```

When it's used alongside `FileDropZone.Textarea` a single paste is only ever uploaded once.

## Drag Overlay

Use the `DragOverlay` component to show a page wide overlay while the user drags files over the page. Files dropped onto the overlay are uploaded just like files dropped onto the `Trigger`.

<Demo demo="file-drop-zone-drag-overlay" />

The overlay is portalled to the `body` so it covers the whole page no matter where `FileDropZone.Root` lives in your tree. To scope it to a container instead, disable the portal and make it absolutely positioned:

```svelte
<div class="relative">
	<FileDropZone.Root {onUpload}>
		<FileDropZone.Trigger />
		<FileDropZone.DragOverlay class="absolute" portalProps={{ disabled: true }} />
	</FileDropZone.Root>
</div>
```

## Form

**Resources:**

- [superforms.rocks — file uploads](https://superforms.rocks/concepts/files#file-uploads)

<Demo demo="file-drop-zone-form" />

Schema:

<div>
	<Code lang="typescript" code={schemaRaw} />
</div>

Server:

```typescript
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = async () => {
	return {
		form: await superValidate({}, zod4(schema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Posted!');
	}
};
```

<ApiReference />
