<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="language-switcher"/>
<Subheading>Installation</Subheading>
<Add item="language-switcher"/>

<Subheading>Ghost + Align</Subheading>
<Demo demo="language-switcher-variants"/>

<Subheading>Paraglide Integration</Subheading>
<p>
	Example of how to integrate with <Link
		href="https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit"
		target="_blank"
		rel="noopener noreferrer"
	>
		ParaglideJS
	</Link>:
</p>
<Demo demo="language-switcher-paraglide"/>
