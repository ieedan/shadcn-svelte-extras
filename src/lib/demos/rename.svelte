<script lang="ts">
	import * as Rename from '$lib/components/ui/rename';
	import { toast } from 'svelte-sonner';

	let value = $state('chore: bump deps');
	let mode = $state<'edit' | 'view'>('view');
</script>

<div class="flex flex-col gap-2">
	<div class="flex w-[300px] flex-col gap-2 sm:flex-row sm:place-items-center sm:justify-between">
		<Rename.Provider>
			<Rename.Root
				this="span"
				bind:value
				bind:mode
				validate={(value) => value.length > 0}
				class="w-[175px] text-xl"
				onSave={(value) => {
					toast.success(`Saved ${value}`);
					return true;
				}}
			/>
			<div class="flex place-items-center gap-2">
				{#if mode === 'edit'}
					<Rename.Save size="sm" />
					<Rename.Cancel size="sm" />
				{:else}
					<Rename.Edit size="sm" />
				{/if}
			</div>
		</Rename.Provider>
	</div>

	<p>Value: <span class="font-bold">{value}</span></p>
</div>
