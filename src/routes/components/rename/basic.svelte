<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Rename } from '$lib/components/ui/rename';

	let mode = $state<'view' | 'edit'>('view');
	let value = $state('Hello');
</script>

<div class="flex flex-col gap-2">
	<div class="flex place-items-center gap-2">
		<Rename this="span" bind:mode bind:value class="text-xl" />
		<Button
			variant="outline"
			size="sm"
			onclick={() => {
				if (mode === 'view') {
					mode = 'edit';
				} else {
					mode = 'view';
				}
			}}
		>
			{#if mode === 'view'}
				Edit
			{:else}
				Cancel
			{/if}
		</Button>
	</div>

	<p>Mode: {mode}</p>
	<p>Value: {value}</p>
</div>
