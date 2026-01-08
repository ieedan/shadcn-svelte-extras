<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import schemaRaw from './schema.ts?raw';
</script>

<Demo demo="file-drop-zone" />
<Subheading>Installation</Subheading>
<Add item="file-drop-zone" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as FileDropZone from "$lib/components/ui/file-drop-zone";
\<\/script\>

<FileDropZone.Root>
	<FileDropZone.Trigger />
	<FileDropZone.Textarea />
</FileDropZone.Root>`}
	/>
</div>
<p>Custom placeholder:</p>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { FileDropZone } from "$lib/components/ui/file-drop-zone";
\<\/script\>

<FileDropZone.Root>
	<FileDropZone.Trigger>
		Upload files
	</FileDropZone.Trigger>
</FileDropZone.Root>`}
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
		code={`import { fail, message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = async () => {
	return {
		form: await superValidate({}, valibot(schema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Posted!');
	}
};
`}
	/>
</div>
