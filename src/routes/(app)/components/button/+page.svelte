<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<p>The same old button you know from shadcn-svelte with a few extra touches.</p>
<Demo demo="button"/>
<Subheading>Installation</Subheading>
<Add item="button"/>
<Subheading>Loading</Subheading>
<Demo demo="button-loading"/>
<Subheading>onClickPromise</Subheading>
<p>
	You can also pass a promise to <CodeSpan>onClickPromise</CodeSpan> to show a loading state until it
	resolves.
</p>
<Demo demo="button-on-click-promise"/>
