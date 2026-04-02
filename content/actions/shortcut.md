---
title: "Shortcut"
description: "An action to create shortcuts for your application."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "<!-- Ctrl/Command + K shortcut -->\n<svelte:window\n\t\tuse:shortcut={{\n\t\t\tkey: 'k',\n\t\t\tctrl: true,\n\t\t\tcallback: commandMenu.toggle\n\t\t}}\n/>";
	const _docCode1 = "<!-- Ctrl/Command + K shortcut -->\n<svelte:window\n\t\t{...attachShortcut({\n\t\t\tkey: 'k',\n\t\t\tctrl: true,\n\t\t\tcallback: commandMenu.toggle\n\t\t})}\n/>";
	const _docCode2 = "<svelte:window\n\t\tuse:shortcut={[\n\t\t\t{\n\t\t\t\tkey: 'k',\n\t\t\t\tctrl: true,\n\t\t\t\tcallback: commandMenu.toggle\n\t\t\t},\n\t\t\t{\n\t\t\t\tkey: 's',\n\t\t\t\tctrl: true,\n\t\t\t\tcallback: searchInput.focus\n\t\t\t}\n\t\t]}\n/>";
</script>

<Demo demo="shortcut" />
<Subheading>Installation</Subheading>
<Add item="shortcut" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Attachment Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode1}
	/>
</div>
<Subheading>Multiple</Subheading>
<p>Configure multiple shortcuts by providing an array of options.</p>
<div>
	<Code
		lang="svelte"
		code={_docCode2}
	/>
</div>
