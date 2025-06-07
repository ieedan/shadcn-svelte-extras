<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { UseFrecency } from '$lib/hooks/use-frecency.svelte';

	const frameworks = ['Angular', 'Svelte', 'React', 'Vue'];

	const frecency = new UseFrecency('frecency-key');
</script>

<div class="flex flex-col gap-2">
	<div class="flex h-[120px] flex-col gap-2">
		{#each frecency.items as item, i (item)}
			<Badge variant="secondary">
				{i + 1}. {item}
			</Badge>
		{/each}
	</div>
	<div class="flex place-items-center gap-2">
		{#each frameworks as framework (framework)}
			<Button variant="outline" onclick={() => frecency.use(framework)}>
				{framework}
			</Button>
		{/each}
	</div>
</div>
