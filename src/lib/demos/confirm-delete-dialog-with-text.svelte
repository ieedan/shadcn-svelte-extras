<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ConfirmDeleteDialog, confirmDelete } from '$lib/components/ui/confirm-delete-dialog';
	import { sleep } from '$lib/utils/sleep';
	import { toast } from 'svelte-sonner';
</script>

<ConfirmDeleteDialog />

<div class="flex items-center justify-center">
	<Button
		variant="destructive"
		size="lg"
		onclick={() => {
			confirmDelete({
				title: 'Delete',
				description: 'Are you sure you want to delete this item?',
				input: {
					confirmationText: 'Please'
				},
				onConfirm: async () => {
					await sleep(500);
					toast.success('Deleted!');
				}
			});
		}}
	>
		Delete
	</Button>
</div>
