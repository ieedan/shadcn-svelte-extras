<script lang="ts" module>
	export type Doc = {
		name: string;
	};
</script>

<script lang="ts">
	import Documents from './file.svelte';

	let documents: Doc[] = $state([
		{ name: '+layout.svelte' },
		{ name: '+page.svelte' },
		{ name: '+page.server.ts' }
	]);

	function checkUnique(name: string, index: number) {
		return !documents.some((document, i) => i !== index && document.name === name);
	}
</script>

<div class="flex flex-col gap-4">
	<p class="text-muted-foreground text-sm">Right click or press <kbd>F2</kbd> to rename files.</p>
	<div class="flex flex-col">
		{#each documents as document, index (document.name)}
			<Documents
				bind:document={documents[index]}
				checkUnique={(name) => checkUnique(name, index)}
			/>
		{/each}
	</div>
</div>
