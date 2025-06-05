<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
	import { Link } from '$lib/components/ui/link';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/language-switcher" />

<Subheading>Ghost + Align</Subheading>
<Playground code={examples.variants.code}>
	<examples.variants.Component />
</Playground>

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
<Playground code={examples.paraglide.code}>
	<examples.paraglide.Component />
</Playground>
