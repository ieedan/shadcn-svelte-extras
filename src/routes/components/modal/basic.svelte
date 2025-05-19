<script lang="ts">
	import { Modal } from '$lib/components/ui/modal';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	let open = false;
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>
<Modal bind:open class="p-0">
	<div class="border-border flex place-items-center border-b px-4 pb-4 sm:pt-4">
		<h2 class="text-xl font-semibold">Create a team</h2>
	</div>
	<div class="flex flex-col gap-4 p-4">
		<p class="text-sm">
			Continue to start collaborating on Pro with increased usage, additional security features, and
			support.
		</p>
		<div>
			<Label>Team Name</Label>
			<Input />
		</div>
	</div>
	<div class="border-border flex place-items-center justify-between border-t p-4">
		<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
		<Button>Continue</Button>
	</div>
</Modal>
