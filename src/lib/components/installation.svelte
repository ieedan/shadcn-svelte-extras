<script lang="ts">
	import JsrepoCommand from './docs/jsrepo-command.svelte';
	import { h2 as MarkdownH2 } from '$lib/components/mdsx';

	type Props = {
		specifier: `${string}/${string}`;
	};

	let { specifier }: Props = $props();
</script>

<MarkdownH2>Installation</MarkdownH2>
<JsrepoCommand command="execute" args={['jsrepo', 'add', specifier]} />
