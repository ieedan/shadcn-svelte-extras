---
title: "File Drop Zone"
description: "A file drop zone component."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import schemaRaw from '$lib/docs/file-drop-zone-schema.ts?raw';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as FileDropZone from \"$lib/components/ui/file-drop-zone\";\n\\<\\/script\\>\n\n<FileDropZone.Root>\n\t<FileDropZone.Trigger />\n\t<FileDropZone.Textarea />\n</FileDropZone.Root>";
	const _docCode1 = "\\<script lang=\"ts\"\\>\n\timport { FileDropZone } from \"$lib/components/ui/file-drop-zone\";\n\\<\\/script\\>\n\n<FileDropZone.Root>\n\t<FileDropZone.Trigger>\n\t\tUpload files\n\t</FileDropZone.Trigger>\n</FileDropZone.Root>";
	const _docCode2 = "import { fail, message, superValidate } from 'sveltekit-superforms';\nimport { valibot } from 'sveltekit-superforms/adapters';\nimport { schema } from './schema';\n\nexport const load = async () => {\n\treturn {\n\t\tform: await superValidate({}, valibot(schema))\n\t};\n};\n\nexport const actions = {\n\tdefault: async ({ request }) => {\n\t\tconst form = await superValidate(request, valibot(schema));\n\n\t\tif (!form.valid) {\n\t\t\treturn fail(400, { form });\n\t\t}\n\n\t\treturn message(form, 'Posted!');\n\t}\n};\n";
</script>

<Demo demo="file-drop-zone" />
<Subheading>Installation</Subheading>
<Add item="file-drop-zone" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<p>Custom placeholder:</p>
<div>
	<Code
		lang="svelte"
		code={_docCode1}
	/>
</div>
<Subheading>Text Area</Subheading>
<p>
	You can use the Textarea component to allow users to paste or drag and drop files into a textarea.
</p>
<Demo demo="file-drop-zone-text-area" />
<Subheading>Form</Subheading>
<div>
	<span> Resources: </span>
	<ul class="list-disc pl-4">
		<li>
			<Link href="https://superforms.rocks/concepts/files#file-uploads" target="_blank">
				https://superforms.rocks/concepts/files#file-uploads
			</Link>
		</li>
	</ul>
</div>
<Demo demo="file-drop-zone-form" />
<p>Schema:</p>
<div>
	<Code lang="typescript" code={schemaRaw} />
</div>
<p>Server:</p>
<div>
	<Code
		lang="typescript"
		code={_docCode2}
	/>
</div>
