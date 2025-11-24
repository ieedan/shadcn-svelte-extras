<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ConfirmDeleteDialog, confirmDelete } from '$lib/components/ui/confirm-delete-dialog';
	import { sleep } from '$lib/utils/sleep';
	import { toast } from 'svelte-sonner';

	let loading = $state(false);

	async function submit() {
		loading = true;
		await sleep(500);
		toast.success('Deleted!');
		loading = false;
	}
</script>

<ConfirmDeleteDialog />

<div class="flex flex-col items-center justify-center gap-2">
	<Button
		{loading}
		variant="destructive"
		size="lg"
		onclick={(e: MouseEvent) => {
			confirmDelete({
				title: 'Delete',
				description: 'Are you sure you want to delete this item?',
				skipConfirmation: e.shiftKey,
				onConfirm: submit
			});
		}}
	>
		Delete
	</Button>
	<span class="text-muted-foreground text-sm"> Shift + Click to skip confirmation. </span>
</div>
