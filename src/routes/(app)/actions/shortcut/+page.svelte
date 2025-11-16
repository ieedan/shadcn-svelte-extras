<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="shortcut"/>
<Subheading>Installation</Subheading>
<Add item="shortcut"/>
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`<!-- Ctrl/Command + K shortcut -->
<svelte:window
		use:shortcut={{
			key: 'k',
			ctrl: true,
			callback: commandMenu.toggle
		}}
/>`}
	/>
</div>
<Subheading>Attachment Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`<!-- Ctrl/Command + K shortcut -->
<svelte:window
		{...attachShortcut({
			key: 'k',
			ctrl: true,
			callback: commandMenu.toggle
		})}
/>`}
	/>
</div>
<Subheading>Multiple</Subheading>
<p>Configure multiple shortcuts by providing an array of options.</p>
<div>
	<Code
		lang="svelte"
		code={`<svelte:window
		use:shortcut={[
			{
				key: 'k',
				ctrl: true,
				callback: commandMenu.toggle
			},
			{
				key: 's',
				ctrl: true,
				callback: searchInput.focus
			}
		]}
/>`}
	/>
</div>
