<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import treeViewFileCustomRaw from './tree-view-file-custom.svelte?raw';
</script>

<Demo demo="tree-view" />
<Subheading>Installation</Subheading>
<Add item="tree-view" />
<Subheading>Custom Icons</Subheading>
<Demo demo="tree-view-custom-icons" />
<p>
	If you are using custom icons in a project we recommend you wrap the folder/file components with
	the custom icons:
</p>
<div>
	<Code lang="svelte" highlight={[[13, 21]]} code={treeViewFileCustomRaw} />
</div>
