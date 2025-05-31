<script lang="ts">
	import { useMetaTags } from './meta-tags-context.svelte.js';
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import { box } from 'svelte-toolbelt';

	let { ...props }: Partial<MetaTagsProps> = $props();

	const metaTags = useMetaTags({ props: box.with(() => props) });
</script>

<MetaTags {...metaTags.props} />
