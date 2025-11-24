<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="use-media" />
<Subheading>Installation</Subheading>
<Add item="use-media" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4]}
		code={`\<script lang="ts"\>
    import { useMedia } from '$lib/hooks/use-media.svelte';

    const media = useMedia();
\<\/script\>

{media.sm}
`}
	/>
</div>
<Subheading>Custom Breakpoints</Subheading>
<p>You can also define your own breakpoints and get full type safety.</p>
<Demo demo="use-media-custom" />
