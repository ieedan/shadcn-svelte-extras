<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
	import { ThemeSelectorReference } from '$lib/components/docs/api-reference/components';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/theme-selector" />
<Subheading>Ghost</Subheading>
<Playground code={examples.variants.code}>
	<examples.variants.Component />
</Playground>
<ApiReference name="ThemeSelector" components={ThemeSelectorReference} />
