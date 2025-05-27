<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { Code } from '$lib/components/ui/code';
	import { examples } from './examples';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="actions/shortcut.svelte" />
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
