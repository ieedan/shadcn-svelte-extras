<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/demo.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import { examples } from './examples';

	let { data } = $props();
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[300px]">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/file-drop-zone" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { FileDropZone } from "$lib/components/ui/file-drop-zone";
\<\/script\>

<FileDropZone/>`}
	/>
</div>
<p>Custom placeholder:</p>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { FileDropZone } from "$lib/components/ui/file-drop-zone";
\<\/script\>

<FileDropZone>
	Upload files
</FileDropZone>`}
	/>
</div>
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
<Playground code={examples.form.code} class="min-h-[300px]">
	<examples.form.Component {data} />
</Playground>
<p>Schema:</p>
<div>
	<Code lang="typescript" code={examples.schema} />
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
<Subheading>Acknowledgements</Subheading>
<p>
	This component takes inspiration from
	<Link href="https://github.com/sadmann7/file-uploader" target="_blank">
		sadmann/file-uploader
	</Link>.
</p>
