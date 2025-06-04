<script lang="ts">
	import JsrepoCommand from './docs/jsrepo-command.svelte';
	import { Subheading } from '$lib/components/docs';

	type Props = {
		specifier: `${string}/${string}`;
	};

	let { specifier }: Props = $props();
</script>

<Subheading>Installation</Subheading>
<JsrepoCommand command="execute" args={['jsrepo', 'add', specifier]} />
