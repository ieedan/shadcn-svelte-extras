<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<Subheading>Basic</Subheading>
<Demo demo="ipv4address-input"/>
<Subheading>Installation</Subheading>
<Add item="ipv4address-input"/>
<Subheading>Placeholder</Subheading>
<Demo demo="ipv4address-input-placeholder"/>
<Subheading>Reactive</Subheading>
<Demo demo="ipv4address-input-reactive"/>
<Subheading>Validation</Subheading>
<Demo demo="ipv4address-input-valid"/>
