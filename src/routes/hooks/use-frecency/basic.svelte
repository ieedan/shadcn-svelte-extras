<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { UseFrecency } from '$lib/hooks/use-frecency.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const frameworks = ['Angular', 'Svelte', 'React', 'Vue'];

	const frecency = new UseFrecency('frecency-key');
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col gap-2 h-[120px]">
		{#each frecency.items as item, i (item)}
			<Badge variant="secondary">
				{i+1}. {item}
			</Badge>
		{/each}
	</div>
	<div class="flex place-items-center gap-2">
		{#each frameworks as framework, i (framework)}
			<Button variant="outline" onclick={() => frecency.use(framework)}>
				{framework}
			</Button>
		{/each}
	</div>
</div>
